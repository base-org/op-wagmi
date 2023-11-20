'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Config } from '@wagmi/core'
import { type SimulateWithdrawERC20Parameters } from 'op-viem/actions'
import { useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type UseSimulateWithdrawERC20Parameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & Pick<SimulateWithdrawERC20Parameters, 'args'>
  & { chainId: number }

export type UseSimulateWithdrawERC20ReturnType<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a withdrawal of ERC20 tokens to an L1 address.
 * @param parameters - {@link UseSimulateWithdrawERC20Parameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateWithdrawERC20ReturnType}
 */
export function useSimulateWithdrawERC20<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, chainId, query, ...rest }: UseSimulateWithdrawERC20Parameters<config, chainId>,
): UseSimulateWithdrawERC20ReturnType<config, chainId> {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[chainId]

  return useSimulateContract({
    address: l2Chain.l2Addresses.l2StandardBridge.address,
    abi: ABI,
    chainId: l2Chain.chainId,
    functionName: FUNCTION,
    args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
    query: query as UseSimulateContractParameters['query'],
    ...rest,
  }) as unknown as UseSimulateWithdrawERC20ReturnType<config, chainId>
}
