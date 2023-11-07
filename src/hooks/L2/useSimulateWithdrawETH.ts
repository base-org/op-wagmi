'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { type SimulateWithdrawETHParameters } from 'op-viem/actions'
import { useChainId, useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'
export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

export type UseSimulateWithdrawETHParameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateContractParameters<typeof ABI, typeof FUNCTION>
  & SimulateWithdrawETHParameters
  & { chainId?: chainId }

/**
 * Simulates a withdrawal of ETH to an L1 address.
 * @param parameters - {@link UseSimulateWithdrawETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateWithdrawETHReturnType}
 */
export function useSimulateWithdrawETH<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, chainId, ...rest }: UseSimulateWithdrawETHParameters<config, chainId>,
) {
  const opConfig = useOpConfig(rest)
  const l2ChainId = chainId || useChainId(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  return useSimulateContract({
    address: l2Chain.l2Addresses.l2StandardBridge.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
  })
}
