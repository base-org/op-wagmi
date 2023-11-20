'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type SimulateDepositETHParameters } from 'op-viem/actions'
import { type Config, useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type UseSimulateDepositETHParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & Pick<SimulateDepositETHParameters, 'args'>
  & { l2ChainId: number }

export type UseSimulateDepositETHReturnType<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link UseSimulateDepositETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateDepositETHReturnType}
 */
export function useSimulateDepositETH<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, l2ChainId, query, ...rest }: UseSimulateDepositETHParameters<config, chainId>,
): UseSimulateDepositETHReturnType<config, chainId> {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  return useSimulateContract({
    address: l2Chain.l1Addresses.portal.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.to, args.amount, BigInt(args.gasLimit), false, args.data ?? '0x'],
    chainId: l2Chain.l1ChaindId,
    value: args.amount,
    query: query as UseSimulateContractParameters['query'],
    ...rest,
  }) as unknown as UseSimulateDepositETHReturnType<config, chainId>
}
