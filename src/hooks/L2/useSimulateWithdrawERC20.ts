'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { useQuery } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { simulateWithdrawERC20, type SimulateWithdrawERC20Parameters } from 'op-viem/actions'
import { useAccount, useChainId, usePublicClient } from 'wagmi'
import { hashFn, simulateContractQueryKey } from 'wagmi/query'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type UseSimulateWithdrawERC20Parameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & SimulateWithdrawERC20Parameters

export type UseSimulateWithdrawERC20ReturnType<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

export function useSimulateWithdrawERC20<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, query: queryOverride, ...rest }: UseSimulateWithdrawERC20Parameters<config, chainId>,
): UseSimulateWithdrawERC20ReturnType<config, chainId> {
  const account = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient({ chainId: rest.chainId ?? chainId })

  const query = {
    async queryFn() {
      return simulateWithdrawERC20(publicClient, { args, account: account.address, ...rest })
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
