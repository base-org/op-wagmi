'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import { getWithdrawalMessages, simulateFinalizeWithdrawalTransaction } from 'op-viem/actions'
import { type Hash } from 'viem'
import { type Config, useAccount, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'

import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'finalizeWithdrawalTransaction'

export type UseSimulateFinalizeWithdrawalTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & {
    args: {
      withdrawalTxHash: Hash
    }
    l2ChainId: number
  }

export type UseSimulateFinalizeWithdrawalTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates finalizing a withdrawal transaction.
 * @param parameters - {@link UseSimulateFinalizeWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateFinalizeWithdrawalTransactionReturnType}
 */
export function useSimulateFinalizeWithdrawalTransaction<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l2ChainId, query: queryOverride, ...rest }: UseSimulateFinalizeWithdrawalTransactionParameters<
    config,
    chainId
  >,
): UseSimulateFinalizeWithdrawalTransactionReturnType<config, chainId> {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const account = useAccount(rest)
  const l1PublicClient = usePublicClient({ chainId: l2Chain.l1ChainId })!
  const l2PublicClient = usePublicClient({ chainId: l2ChainId })!
  const l1Addresses = opConfig.l2chains[l2ChainId].l1Addresses

  const query = {
    async queryFn() {
      const withdrawalMessages = await getWithdrawalMessages(l2PublicClient, {
        hash: args.withdrawalTxHash,
      })

      return simulateFinalizeWithdrawalTransaction(l1PublicClient, {
        withdrawal: withdrawalMessages.messages[0],
        account: account.address,
        ...l1Addresses,
      })
    },
    ...queryOverride,
    queryKey: simulateContractQueryKey({
      ...{
        ...rest,
        ...queryOverride,
        gasPrice: undefined,
        blockNumber: undefined,
        type: undefined,
        value: undefined,
        ...args,
      },
      account: account.address,
      chainId: l2Chain.l1ChainId,
      action: 'finalizeWithdrawalTransaction',
    }),
  }

  const enabled = Boolean(account.address) && (queryOverride?.enabled ?? true) && Boolean(l1PublicClient)
    && Boolean(l2PublicClient)
  return {
    ...useQuery({ ...query, queryKeyHashFn: hashFn, enabled }),
    queryKey: query.queryKey,
  }
}
