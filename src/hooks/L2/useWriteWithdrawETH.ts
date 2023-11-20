import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawETHParameters as WriteWithdrawETHActionParameters } from 'op-viem/actions'
import { useWriteContract } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'
import { OVM_ETH } from './useSimulateWithdrawETH.js'

export type WriteWithdrawETHParameters = Pick<WriteWithdrawETHActionParameters, 'args'>

export type UseWriteWithdrawETHParameters<config extends Config = OpConfig, context = unknown> =
  & UseWriteOPActionBaseParameters<config, context>
  & { chainId: number }

export type UseWriteWithdrawETHReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeWithdrawETH: UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>['write']
    writeWithdrawETHAsync: UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>['writeAsync']
  }

/**
 * Withdraws ETH to an L1 address.
 * @param parameters - {@link UseWriteWithdrawETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawETHReturnType}
 */
export function useWriteWithdrawETH<config extends Config = OpConfig, context = unknown>(
  { chainId, ...rest }: UseWriteWithdrawETHParameters<config, context>,
): UseWriteWithdrawETHReturnType<config, context> {
  const config = useOpConfig(rest)
  const l2Chain = config.l2chains[chainId]
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract()

  return {
    writeWithdrawETH: ({ args }: WriteWithdrawETHParameters) =>
      writeContract({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
        value: args.amount,
      }),
    writeWithdrawETHAsync: ({ args }: WriteWithdrawETHParameters) =>
      writeContractAsync({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
        value: args.amount,
      }),
    ...writeReturn,
  } as unknown as UseWriteWithdrawETHReturnType<config, context>
}
