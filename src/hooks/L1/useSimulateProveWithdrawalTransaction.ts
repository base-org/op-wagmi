'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import {
  getLatestProposedL2BlockNumber,
  getOutputForL2Block,
  getProveWithdrawalTransactionArgs,
  getWithdrawalMessages,
  simulateProveWithdrawalTransaction,
} from 'op-viem/actions'
import { type Hash } from 'viem'
import { type Config, useAccount, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'proveWithdrawalTransaction'

export type UseSimulateProveWithdrawalTransactionParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & {
    args: {
      withdrawalTxHash: Hash
    }
    l2ChainId: number
  }

export type UseSimulateProveWithdrawalTransactionReturnType<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates proving a withdrawal transaction.
 * @param parameters - {@link UseSimulateProveWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateProveWithdrawalTransactionReturnType}
 */
export function useSimulateProveWithdrawalTransaction<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l2ChainId, query: queryOverride, ...rest }: UseSimulateProveWithdrawalTransactionParameters<config, chainId>,
): UseSimulateProveWithdrawalTransactionReturnType<config, chainId> {
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

      const { l2BlockNumber } = await getLatestProposedL2BlockNumber(l1PublicClient, {
        ...l1Addresses,
      })

      const output = await getOutputForL2Block(l1PublicClient, {
        l2BlockNumber,
        ...l1Addresses,
      })

      const simulateProveWithdrawalTransactionArgs = await getProveWithdrawalTransactionArgs(l2PublicClient, {
        message: withdrawalMessages.messages[0],
        output: output,
      })

      return simulateProveWithdrawalTransaction(l1PublicClient, {
        args: simulateProveWithdrawalTransactionArgs,
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
      action: 'proveWithdrawalTransaction',
    }),
  }

  const enabled = Boolean(account.address) && (queryOverride?.enabled ?? true) && Boolean(l1PublicClient)
    && Boolean(l2PublicClient)
  return {
    ...useQuery({ ...query, queryKeyHashFn: hashFn, enabled }),
    queryKey: query.queryKey,
  }
}
