'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type SimulateDepositETHParameters } from 'op-viem/actions'
import {
  type Config,
  useAccount,
  useConfig,
  useEstimateGas,
  useSimulateContract,
  type UseSimulateContractParameters,
} from 'wagmi'

import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { validateL2Chain, validatePortalContract } from '../../util/validateChains.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type UseSimulateDepositETHParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // We'll estimate the L2 gas needed so we can make the gasLimit argument optional
  & { args: Omit<Pick<SimulateDepositETHParameters, 'args'>['args'], 'gasLimit'> & { gasLimit?: number } }
  & { l2ChainId: number }

export type UseSimulateDepositETHReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link UseSimulateDepositETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateDepositETHReturnType}
 */
export function useSimulateDepositETH<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l2ChainId, query, ...rest }: UseSimulateDepositETHParameters<config, chainId>,
): UseSimulateDepositETHReturnType<config, chainId> {
  const config = useConfig(rest)
  const account = useAccount(rest)

  const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)
  const portal = validatePortalContract(l1ChainId, l2Chain)

  const { data: l2GasEstimate } = useEstimateGas({
    chainId: l2ChainId,
    to: args.to,
    value: args.amount,
    data: args.data,
    account: account.address,
  })

  const enabled = Boolean(args.gasLimit || l2GasEstimate) && (query?.enabled ?? true)
  return useSimulateContract({
    address: portal.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.to, args.amount, BigInt(args.gasLimit ?? l2GasEstimate ?? 0), false, args.data ?? '0x'],
    chainId: l1ChainId,
    value: args.amount,
    query: { ...query, enabled } as UseSimulateContractParameters['query'],
    account: account.address,
    ...rest,
  }) as unknown as UseSimulateDepositETHReturnType<config, chainId>
}
