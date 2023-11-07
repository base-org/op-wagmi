'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type SimulateDepositETHParameters } from 'op-viem/actions'
import { useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type UseSimulateDepositETHParameters =
  & UseSimulateContractParameters
  & SimulateDepositETHParameters
  & { l2ChainId: number }

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link UseSimulateDepositETHParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateDepositETHReturnType}
 */
export function useSimulateDepositETH(
  { args, l2ChainId, ...rest }: UseSimulateDepositETHParameters,
) {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  return useSimulateContract({
    address: l2Chain.l1Addresses.l1StandardBridge.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.to, args.amount, args.gasLimit, false, args.data || '0x'],
    chainId: l2Chain.l1ChaindId,
    ...rest,
  })
}
