import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawETHParameters as WriteWithdrawETHActionParameters } from 'op-viem/actions'
import { useChainId, useWriteContract, type UseWriteContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'
import { OVM_ETH } from './useSimulateWithdrawETH.js'

export type WriteWithdrawETHParameters = Omit<WriteWithdrawETHActionParameters, 'account'> & { chainId?: number }

export type UseWriteWithdrawETHParameters<config extends Config = Config, context = unknown> =
  & UseWriteContractParameters<config, context>
  & WriteWithdrawETHParameters

/**
 * Withdraws ETH to an L1 address.
 * @param parameters - {@link UseWriteWithdrawETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawETHReturnType}
 */
export function useWriteWithdrawETH(
  { args, chainId, ...rest }: UseWriteWithdrawETHParameters,
) {
  const config = useOpConfig(rest)
  const l2ChainId = chainId || useChainId(rest)
  const l2Chain = config.l2chains[l2ChainId]
  const { writeContract, writeContractAsync } = useWriteContract()

  return {
    writeWithdrawETH: () =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    writeWithdrawETHAsync: () =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
  }
}
