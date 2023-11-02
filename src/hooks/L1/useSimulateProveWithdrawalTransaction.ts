'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { simulateProveWithdrawalTransaction } from 'op-viem/actions'
import type { Hash } from 'viem'
import { useAccount, useChainId, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'
// import { getLatestProposedL2BlockNumber } from 'op-viem/actions/L1/getLatestProposedL2BlockNumber'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type UseProveWithdrawalTransactionParameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & {
    args: {
      l1WithdrawalTxHash: Hash
      l2ChainId: number
    }
  }

export type UseProveWithdrawalTransactionReturnType<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a proof of ERC20 token withdrawal transaction to an L1 address.
 * @param parameters - {@link UseProveWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseProveWithdrawalTransactionReturnType}
 */
export async function useProveWithdrawalTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, query: queryOverride, ...rest }: UseProveWithdrawalTransactionParameters<config, chainId>,
): Promise<UseProveWithdrawalTransactionReturnType<config, chainId>> {
  const opConfig = useOpConfig()
  const account = useAccount()
  const chainId = useChainId()
  const l2Chain = opConfig.l2chains[args.l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const publicClient = usePublicClient({ chainId: l2Chain.l1ChaindId })

  const _latestL2Block = await getLatestProposedL2BlockNumber(publicClient, {
    l2OutputOracle: l2Chain.l1Addresses.l2OutputOracle,
  })

  const query = {
    async queryFn() {
      // return proveWithdrawalTransaction(publicClient, { args, account: account.address, ...rest })
      return simulateProveWithdrawalTransaction(publicClient, { args, account: account.address, ...rest })
    },
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
      chainId,
    }),
  }

  const enabled = Boolean(account.address) && (queryOverride?.enabled ?? true)
  return {
    ...useQuery({ ...query, queryKeyHashFn: hashFn, enabled }),
    queryKey: query.queryKey,
  }
}
