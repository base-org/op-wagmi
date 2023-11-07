'use client'

import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type SimulateDepositERC20Parameters } from 'op-viem/actions'
import { useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l1StandardBridgeABI
const FUNCTION = 'depositERC20To'

export type UseSimulateDepositERC20Parameters =
  & UseSimulateContractParameters
  & SimulateDepositERC20Parameters
  & { l2ChainId: number }

/**
 * Simulates a deposit of ERC20 tokens to L2
 * @param parameters - {@link UseSimulateDepositERC20Parameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseSimulateDepositERC20ReturnType}
 */
export function useSimulateDepositERC20(
  { args, l2ChainId, ...rest }: UseSimulateDepositERC20Parameters,
) {
  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[l2ChainId]

  return useSimulateContract({
    address: l2Chain.l1Addresses.l1StandardBridge.address,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
    chainId: l2Chain.l1ChaindId,
    ...rest,
  })
}
