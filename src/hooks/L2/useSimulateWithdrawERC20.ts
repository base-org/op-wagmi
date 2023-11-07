'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { type SimulateWithdrawERC20Parameters } from 'op-viem/actions'
import { useChainId, useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type UseSimulateWithdrawERC20Parameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateContractParameters<typeof ABI, typeof FUNCTION>
  & SimulateWithdrawERC20Parameters
  & { chainId?: chainId }

/**
 * Simulates a withdrawal of ERC20 tokens to an L1 address.
 * @param parameters - {@link UseSimulateWithdrawERC20Parameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateWithdrawERC20ReturnType}
 */
export function useSimulateWithdrawERC20<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, chainId, ...rest }: UseSimulateWithdrawERC20Parameters<config, chainId>,
) {
  const opConfig = useOpConfig(rest)
  const l2ChainId = chainId || useChainId(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  return useSimulateContract({
    address: l2Chain.l2Addresses.l2StandardBridge.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
  })
}
