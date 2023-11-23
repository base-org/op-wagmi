import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useMutation } from '@tanstack/react-query'
import {
  getWithdrawalMessages,
  simulateFinalizeWithdrawalTransaction,
  writeFinalizeWithdrawalTranasction,
} from 'op-viem/actions'
import type { Hash } from 'viem'
import { type Config, useChainId } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'finalizeWithdrawalTransaction'

export type WriteFinalizeWithdrawalTransactionParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] = number,
> = WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId> & {
  args: {
    l1WithdrawalTxHash: Hash
  }
  l2ChainId: number
}

export type UseWriteFinalizeWithdrawalTransactionParameters<config extends Config = OpConfig, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteFinalizeWithdrawalTransactionReturnType<config extends Config = OpConfig, context = unknown> =
  & Omit<
    UseWriteOPActionBaseReturnType<WriteFinalizeWithdrawalTransactionParameters, config, context>,
    'write' | 'writeAsync'
  >
  & {
    writeFinalizeWithdrawalTransaction: UseWriteOPActionBaseReturnType<
      WriteFinalizeWithdrawalTransactionParameters,
      config,
      context
    >['write']
    writeFinalizeWithdrawalTransactionAsync: UseWriteOPActionBaseReturnType<
      WriteFinalizeWithdrawalTransactionParameters,
      config,
      context
    >['writeAsync']
  }

type FinalizeWithdrawalTransactionMutationParameters = WriteFinalizeWithdrawalTransactionParameters & {
  l1ChainId: number
}

async function writeMutation(
  config: OpConfig,
  { l1ChainId, l2ChainId, args, ...rest }: FinalizeWithdrawalTransactionMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId })
  const l1PublicClient = getPublicClient(config, { chainId: l1ChainId })
  const l2PublicClient = getPublicClient(config, { chainId: l2ChainId })
  const l1Addresses = config.l2chains[l2ChainId].l1Addresses

  const withdrawalMessages = await getWithdrawalMessages(l2PublicClient, {
    hash: args.l1WithdrawalTxHash,
  })

  await simulateFinalizeWithdrawalTransaction(l1PublicClient, {
    withdrawal: withdrawalMessages.messages[0],
    account: walletClient.account.address,
    ...l1Addresses,
    ...rest,
  })
  return writeFinalizeWithdrawalTranasction(walletClient, {
    args: { withdrawal: withdrawalMessages.messages[0] },
    account: walletClient.account.address,
    ...l1Addresses,
    ...rest,
  })
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteFinalizeWithdrawalTransactionParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteFinalizeWithdrawalTransactionReturnType}
 */
export function useWriteFinalizeWithdrawalTransaction<config extends Config = OpConfig, context = unknown>(
  args: UseWriteFinalizeWithdrawalTransactionParameters<config, context> = {},
): UseWriteFinalizeWithdrawalTransactionReturnType<config, context> {
  const opConfig = useOpConfig(args)
  const currentChainId = useChainId()

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteFinalizeWithdrawalTransactionParameters) {
      const l2Chain = opConfig.l2chains[l2ChainId]

      if (!l2Chain) {
        throw new Error('L2 chain not configured')
      }

      if (currentChainId !== l2Chain.l1ChainId) {
        throw new Error(`Chain mismatch. Expected ${l2Chain.l1ChainId}, got ${currentChainId}.`)
      }

      return writeMutation(opConfig, { args, l1ChainId: l2Chain.l1ChainId, l2ChainId: l2ChainId, ...rest })
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation(mutation)

  return {
    ...result,
    writeFinalizeWithdrawalTransaction: mutate,
    writeFinalizeWithdrawalTransactionAsync: mutateAsync,
  } as unknown as UseWriteFinalizeWithdrawalTransactionReturnType<config, context>
}
