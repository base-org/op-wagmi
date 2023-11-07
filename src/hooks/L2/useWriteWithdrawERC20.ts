import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawERC20Parameters as WriteWithdrawERC20ActionParameters } from 'op-viem/actions'
import { useChainId, useWriteContract, type UseWriteContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

export type WriteWithdrawERC20Parameters = Omit<WriteWithdrawERC20ActionParameters, 'account'> & { chainId?: number }

export type UseWriteWithdrawERC20Parameters<config extends Config = Config, context = unknown> =
  & UseWriteContractParameters<config, context>
  & WriteWithdrawERC20Parameters

/**
 * Withdraws ERC20 tokens to an L1 address.
 * @param parameters - {@link UseWriteWithdrawERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawERC20ReturnType}
 */
export function useWriteWithdrawERC20(
  { args, chainId, ...rest }: UseWriteWithdrawERC20Parameters,
) {
  const config = useOpConfig(rest)
  const l2ChainId = chainId || useChainId(rest)
  const l2Chain = config.l2chains[l2ChainId]
  const { writeContract, writeContractAsync } = useWriteContract()

  return {
    writeWithdrawERC20: () =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    writeWithdrawERC20Async: () =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: l2StandardBridgeABI,
        functionName: 'withdrawTo',
        args: [args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
  }
}
