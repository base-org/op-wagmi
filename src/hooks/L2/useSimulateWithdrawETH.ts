'use client'

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Config } from '@wagmi/core'
import { type SimulateWithdrawETHParameters } from 'op-viem/actions'
import { useAccount, useConfig, useSimulateContract, type UseSimulateContractParameters } from 'wagmi'

import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { validateL2Chain, validateL2StandardBridgeContract } from '../../util/validateChains.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'
export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

export type UseSimulateWithdrawETHParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // The CrossDomainMessenger will add the gas we need, so we can pass 0 to the contract by default & make the argument optional
  & { args: Omit<Pick<SimulateWithdrawETHParameters, 'args'>['args'], 'minGasLimit'> & { minGasLimit?: number } }
  & { chainId: number }

export type UseSimulateWithdrawETHReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a withdrawal of ETH to an L1 address.
 * @param parameters - {@link UseSimulateWithdrawETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateWithdrawETHReturnType}
 */
export function useSimulateWithdrawETH<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, chainId, query, ...rest }: UseSimulateWithdrawETHParameters<config, chainId>,
): UseSimulateWithdrawETHReturnType<config, chainId> {
  const config = useConfig(rest)
  const account = useAccount(rest)

  const { l2Chain } = validateL2Chain(config, chainId)
  const l2StandardBridge = validateL2StandardBridgeContract(l2Chain).address

  return useSimulateContract({
    address: l2StandardBridge,
    abi: ABI,
    functionName: FUNCTION,
    chainId: l2Chain.id,
    args: [OVM_ETH, args.to, args.amount, args.minGasLimit ?? 0, args.extraData ?? '0x'],
    value: args.amount,
    query: query as UseSimulateContractParameters['query'],
    account: account.address,
    ...rest,
  }) as unknown as UseSimulateWithdrawETHReturnType<config, chainId>
}
