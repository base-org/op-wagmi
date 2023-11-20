'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Config } from '@wagmi/core'
import { type SimulateWithdrawETHParameters } from 'op-viem/actions'
import { useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'
export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

export type UseSimulateWithdrawETHParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & Pick<SimulateWithdrawETHParameters, 'args'>
  & { chainId: number }

export type UseSimulateWithdrawETHReturnType<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a withdrawal of ETH to an L1 address.
 * @param parameters - {@link UseSimulateWithdrawETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateWithdrawETHReturnType}
 */
export function useSimulateWithdrawETH<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, chainId, query, ...rest }: UseSimulateWithdrawETHParameters<config, chainId>,
): UseSimulateWithdrawETHReturnType<config, chainId> {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[chainId]

  return useSimulateContract({
    address: l2Chain.l2Addresses.l2StandardBridge.address,
    abi: ABI,
    functionName: FUNCTION,
    chainId: l2Chain.chainId,
    args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
    value: args.amount,
    query: query as UseSimulateContractParameters['query'],
    ...rest,
  }) as unknown as UseSimulateWithdrawETHReturnType<config, chainId>
}
