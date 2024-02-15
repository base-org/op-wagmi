import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useMutation } from '@tanstack/react-query'
import {
  getWithdrawalMessages,
  simulateFinalizeWithdrawalTransaction,
  writeFinalizeWithdrawalTranasction,
} from 'op-viem/actions'
import type { Chain, ChainContract, Hash } from 'viem'
import { type Config, useConfig } from 'wagmi'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'

const ABI = optimismPortalABI
const FUNCTION = 'finalizeWithdrawalTransaction'

export type WriteFinalizeWithdrawalTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
> = WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId> & {
  args: {
    withdrawalTxHash: Hash
  }
  l2ChainId: number
}

export type UseWriteFinalizeWithdrawalTransactionParameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteFinalizeWithdrawalTransactionReturnType<config extends Config = Config, context = unknown> =
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

type FinalizeWithdrawalTransactionMutationParameters = {
  l1ChainId: number
  l2Chain: Chain
} & WriteFinalizeWithdrawalTransactionParameters

async function writeMutation(
  config: Config,
  { l1ChainId, l2Chain, args, ...rest }: FinalizeWithdrawalTransactionMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId })
  const l1PublicClient = await getPublicClient(config, { chainId: l1ChainId })!
  const l2PublicClient = await getPublicClient(config, { chainId: l2Chain.id })!
  const portal: ChainContract | undefined = l2Chain?.contracts?.portal
    ?.[l1ChainId as keyof typeof l2Chain.contracts.portal]

  if (!portal) {
    throw new Error(`Portal contract to chainId ${l1ChainId} not configured for chain ${l2Chain.name}`)
  }

  const withdrawalMessages = await getWithdrawalMessages(l2PublicClient, {
    hash: args.withdrawalTxHash,
  })

  await simulateFinalizeWithdrawalTransaction(l1PublicClient, {
    withdrawal: withdrawalMessages.messages[0],
    account: walletClient.account.address,
    portal,
    ...rest,
  })
  return writeFinalizeWithdrawalTranasction(walletClient, {
    args: { withdrawal: withdrawalMessages.messages[0] },
    account: walletClient.account.address,
    portal,
    ...rest,
  })
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteFinalizeWithdrawalTransactionParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteFinalizeWithdrawalTransactionReturnType}
 */
export function useWriteFinalizeWithdrawalTransaction<config extends Config = Config, context = unknown>(
  args: UseWriteFinalizeWithdrawalTransactionParameters<config, context> = {},
): UseWriteFinalizeWithdrawalTransactionReturnType<config, context> {
  const config = useConfig(args)

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteFinalizeWithdrawalTransactionParameters) {
      const l2Chain = config.chains.find((chain) => chain.id === l2ChainId)

      if (!l2Chain) {
        throw new Error('L2 chain not configured')
      }
      if (!l2Chain.sourceId) {
        throw new Error(`Chain ${l2Chain.name} does not have a source chain, is it an L2 chain?`)
      }

      return writeMutation(config, { args, l1ChainId: l2Chain.sourceId, l2Chain, l2ChainId: l2Chain.id, ...rest })
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
