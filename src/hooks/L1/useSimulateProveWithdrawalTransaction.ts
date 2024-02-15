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
import { type Config, useAccount, useConfig, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'

import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { validateL2Chain, validateL2OutputOracleContract, validatePortalContract } from '../../util/validateChains.js'

const ABI = optimismPortalABI
const FUNCTION = 'proveWithdrawalTransaction'

export type UseSimulateProveWithdrawalTransactionParameters<
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

export type UseSimulateProveWithdrawalTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates proving a withdrawal transaction.
 * @param parameters - {@link UseSimulateProveWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateProveWithdrawalTransactionReturnType}
 */
export function useSimulateProveWithdrawalTransaction<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l2ChainId, query: queryOverride, ...rest }: UseSimulateProveWithdrawalTransactionParameters<config, chainId>,
): UseSimulateProveWithdrawalTransactionReturnType<config, chainId> {
  const config = useConfig(rest)

  const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)

  const account = useAccount(rest)
  const l1PublicClient = usePublicClient({ chainId: l1ChainId })!
  const l2PublicClient = usePublicClient({ chainId: l2ChainId })!

  const l2OutputOracle = validateL2OutputOracleContract(l1ChainId, l2Chain).address
  const portal = validatePortalContract(l1ChainId, l2Chain).address

  const query = {
    async queryFn() {
      const withdrawalMessages = await getWithdrawalMessages(l2PublicClient, {
        hash: args.withdrawalTxHash,
      })

      const { l2BlockNumber } = await getLatestProposedL2BlockNumber(l1PublicClient, {
        l2OutputOracle,
      })

      const output = await getOutputForL2Block(l1PublicClient, {
        l2BlockNumber,
        l2OutputOracle,
      })

      const simulateProveWithdrawalTransactionArgs = await getProveWithdrawalTransactionArgs(l2PublicClient, {
        message: withdrawalMessages.messages[0],
        output: output,
      })

      return simulateProveWithdrawalTransaction(l1PublicClient, {
        args: simulateProveWithdrawalTransactionArgs,
        account: account.address,
        portal,
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
      chainId: l1ChainId,
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
