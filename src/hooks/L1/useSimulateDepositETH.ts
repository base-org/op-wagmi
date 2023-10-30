'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { simulateDepositETH, type SimulateDepositETHParameters } from 'op-viem/actions'
import { useAccount, useChainId, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type UseSimulateDepositETHParameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & SimulateDepositETHParameters

export type UseSimulateDepositETHReturnType<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

export function useSimulateDepositETH<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, portal, query: queryOverride, ...rest }: UseSimulateDepositETHParameters<config, chainId>,
): UseSimulateDepositETHReturnType<config, chainId> {
  const account = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient({ chainId: rest.chainId ?? chainId })

  const query = {
    async queryFn() {
      return simulateDepositETH(publicClient, { args, portal, account: account.address, ...rest })
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
