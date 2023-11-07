import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteDepositETHParameters as WriteDepositETHActionParameters } from 'op-viem/actions'
import { useWriteContract, type UseWriteContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'

export type WriteDepositETHParameters = Omit<WriteDepositETHActionParameters, 'account'> & { l2ChainId: number }

export type UseWriteDepositETHParameters<config extends Config = Config, context = unknown> =
  & UseWriteContractParameters<config, context>
  & WriteDepositETHParameters

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteDepositETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositETHReturnType}
 */
export function useWriteDepositETH({ args, l2ChainId, ...rest }: UseWriteDepositETHParameters) {
  const config = useOpConfig(rest)
  const l2Chain = config.l2chains[l2ChainId]
  const { writeContract, writeContractAsync } = useWriteContract()

  return {
    writeDepositETH: () =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.portal.address,
        abi: optimismPortalABI,
        functionName: 'depositTransaction',
        args: [args.to, args.amount, BigInt(args.gasLimit), false, args.data || '0x'],
      }),
    writeDepositETHAsync: () =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.portal.address,
        abi: optimismPortalABI,
        functionName: 'depositTransaction',
        args: [args.to, args.amount, BigInt(args.gasLimit), false, args.data || '0x'],
      }),
  }
}
