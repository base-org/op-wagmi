import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawERC20Parameters as WriteWithdrawERC20ActionParameters } from 'op-viem/actions'
import { useWriteContract } from 'wagmi'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

export type WriteWithdrawERC20Parameters = Pick<WriteWithdrawERC20ActionParameters, 'args'>

export type UseWriteWithdrawERC20Parameters<config extends Config = Config, context = unknown> =
  & UseWriteOPActionBaseParameters<config, context>
  & { chainId: number }

export type UseWriteWithdrawERC20ReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteWithdrawERC20Parameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeWithdrawERC20: UseWriteOPActionBaseReturnType<WriteWithdrawERC20Parameters, config, context>['write']
    writeWithdrawERC20Async: UseWriteOPActionBaseReturnType<WriteWithdrawERC20Parameters, config, context>['writeAsync']
  }

/**
 * Withdraws ERC20 tokens to an L1 address.
 * @param parameters - {@link UseWriteWithdrawERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawERC20ReturnType}
 */
export function useWriteWithdrawERC20(
  { chainId, ...rest }: UseWriteWithdrawERC20Parameters,
) {
  const config = useOpConfig(rest)
  const l2Chain = config.l2chains[chainId]
  const { writeContract, writeContractAsync } = useWriteContract()

  return {
    writeWithdrawERC20: ({ args }: WriteWithdrawERC20Parameters) =>
      writeContract({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    writeWithdrawERC20Async: ({ args }: WriteWithdrawERC20Parameters) =>
      writeContractAsync({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
  }
}
