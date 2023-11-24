import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useMutation } from '@tanstack/react-query'
import {
  getLatestProposedL2BlockNumber,
  getOutputForL2Block,
  getProveWithdrawalTransactionArgs,
  getWithdrawalMessages,
  simulateProveWithdrawalTransaction,
  writeProveWithdrawalTransaction,
} from 'op-viem/actions'
import type { Hash } from 'viem'
import { type Config } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'proveWithdrawalTransaction'

export type WriteProveWithdrawalTransactionParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] = number,
> = WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId> & {
  args: {
    withdrawalTxHash: Hash
  }
  l2ChainId: number
}

export type UseWriteProveWithdrawalTransactionParameters<config extends Config = OpConfig, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteProveWithdrawalTransactionReturnType<config extends Config = OpConfig, context = unknown> =
  & Omit<
    UseWriteOPActionBaseReturnType<WriteProveWithdrawalTransactionParameters, config, context>,
    'write' | 'writeAsync'
  >
  & {
    writeProveWithdrawalTransaction: UseWriteOPActionBaseReturnType<
      WriteProveWithdrawalTransactionParameters,
      config,
      context
    >['write']
    writeProveWithdrawalTransactionAsync: UseWriteOPActionBaseReturnType<
      WriteProveWithdrawalTransactionParameters,
      config,
      context
    >['writeAsync']
  }

type ProveWithdrawalTransactionMutationParameters = WriteProveWithdrawalTransactionParameters & {
  l1ChainId: number
}

async function writeMutation(
  config: OpConfig,
  { l1ChainId, l2ChainId, args, ...rest }: ProveWithdrawalTransactionMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId })
  const l1PublicClient = getPublicClient(config, { chainId: l1ChainId })
  const l2PublicClient = getPublicClient(config, { chainId: l2ChainId })
  const l1Addresses = config.l2chains[l2ChainId].l1Addresses

  const withdrawalMessages = await getWithdrawalMessages(l2PublicClient, {
    hash: args.withdrawalTxHash,
  })

  const { l2BlockNumber } = await getLatestProposedL2BlockNumber(l1PublicClient, {
    ...l1Addresses,
  })

  const output = await getOutputForL2Block(l1PublicClient, {
    l2BlockNumber,
    ...l1Addresses,
  })

  const proveWithdrawalTransactionArgs = await getProveWithdrawalTransactionArgs(l2PublicClient, {
    message: withdrawalMessages.messages[0],
    output: output,
  })

  await simulateProveWithdrawalTransaction(l1PublicClient, {
    args: proveWithdrawalTransactionArgs,
    account: walletClient.account.address,
    ...l1Addresses,
    ...rest,
  })
  return writeProveWithdrawalTransaction(walletClient, {
    args: proveWithdrawalTransactionArgs,
    account: walletClient.account.address,
    ...l1Addresses,
    ...rest,
  })
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteProveWithdrawalTransactionParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteProveWithdrawalTransactionReturnType}
 */
export function useWriteProveWithdrawalTransaction<config extends Config = OpConfig, context = unknown>(
  args: UseWriteProveWithdrawalTransactionParameters<config, context> = {},
): UseWriteProveWithdrawalTransactionReturnType<config, context> {
  const opConfig = useOpConfig(args)

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteProveWithdrawalTransactionParameters) {
      const l2Chain = opConfig.l2chains[l2ChainId]

      if (!l2Chain) {
        throw new Error('L2 chain not configured')
      }

      return writeMutation(opConfig, { args, l1ChainId: l2Chain.l1ChainId, l2ChainId: l2ChainId, ...rest })
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation(mutation)

  return {
    ...result,
    writeProveWithdrawalTransaction: mutate,
    writeProveWithdrawalTransactionAsync: mutateAsync,
  } as unknown as UseWriteProveWithdrawalTransactionReturnType<config, context>
}
