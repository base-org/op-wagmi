import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteDepositERC20Parameters as WriteDepositERC20ActionParameters } from 'op-viem/actions'
import { useWriteContract, type UseWriteContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

export type WriteDepositERC20Parameters = Omit<WriteDepositERC20ActionParameters, 'account'> & { l2ChainId: number }

export type UseWriteDepositERC20Parameters<config extends Config = Config, context = unknown> =
  & UseWriteContractParameters<config, context>
  & WriteDepositERC20Parameters

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link UseWriteDepositERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositERC20ReturnType}
 */
export function useWriteDepositERC20(
  { args, l2ChainId, ...rest }: UseWriteDepositERC20Parameters,
) {
  const config = useOpConfig(rest)
  const l2Chain = config.l2chains[l2ChainId]
  const { writeContract, writeContractAsync, ...result } = useWriteContract()

  return {
    ...result,
    writeDepositERC20: () =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.l1StandardBridge.address,
        abi: l1StandardBridgeABI,
        functionName: 'depositERC20To',
        args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    writeDepositERC20Async: () =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.l1StandardBridge.address,
        abi: l1StandardBridgeABI,
        functionName: 'depositERC20To',
        args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
  }
}
