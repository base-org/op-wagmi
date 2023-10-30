'use client'

import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { simulateDepositERC20, type SimulateDepositERC20Parameters } from 'op-viem/actions'
import { useAccount, useChainId, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'

const ABI = l1StandardBridgeABI
const FUNCTION = 'depositERC20'

export type UseSimulateDepositERC20Parameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & SimulateDepositERC20Parameters

export type UseSimulateDepositERC20ReturnType<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a deposit of ERC20 tokens to L2
 * @param parameters - {@link UseSimulateDepositERC20Parameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateDepositERC20ReturnType}
 */
export function useSimulateDepositERC20<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l1StandardBridge, query: queryOverride, ...rest }: UseSimulateDepositERC20Parameters<config, chainId>,
): UseSimulateDepositERC20ReturnType<config, chainId> {
  const account = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient({ chainId: rest.chainId ?? chainId })

  const query = {
    async queryFn() {
      return simulateDepositERC20(publicClient, { args, l1StandardBridge, account: account.address, ...rest })
    },
    queryKey: simulateContractQueryKey({
      ...{ ...rest, ...queryOverride, gasPrice: undefined, blockNumber: undefined, type: undefined, ...args },
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
