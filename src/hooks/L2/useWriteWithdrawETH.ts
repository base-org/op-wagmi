import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawETHParameters as WriteWithdrawETHActionParameters } from 'op-viem/actions'
import { useWriteContract } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'
import { OVM_ETH } from './useSimulateWithdrawETH.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type WriteWithdrawETHParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & Pick<WriteWithdrawETHActionParameters, 'args'>
  & { chainId: number }

export type UseWriteWithdrawETHParameters<config extends Config = OpConfig, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteWithdrawETHReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeWithdrawETH: UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>['write']
    writeWithdrawETHAsync: UseWriteOPActionBaseReturnType<
      WriteWithdrawETHParameters,
      config,
      context
    >['writeAsync']
  }

/**
 * Withdraws ETH to an L1 address.
 * @param parameters - {@link UseWriteWithdrawETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawETHReturnType}
 */
export function useWriteWithdrawETH<config extends Config = OpConfig, context = unknown>(
  args: UseWriteWithdrawETHParameters<config, context> = {},
): UseWriteWithdrawETHReturnType<config, context> {
  const config = useOpConfig(args)
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract()

  return {
    writeWithdrawETH: ({ chainId, args, ...rest }: WriteWithdrawETHParameters) => {
      const l2Chain = config.l2chains[chainId]

      return writeContract({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: ABI,
        functionName: FUNCTION,
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
        value: args.amount,
        ...rest,
      })
    },
    writeWithdrawETHAsync: ({ chainId, args, ...rest }: WriteWithdrawETHParameters) => {
      const l2Chain = config.l2chains[chainId]

      writeContractAsync({
        chainId: l2Chain.chainId,
        address: l2Chain.l2Addresses.l2StandardBridge.address,
        abi: ABI,
        functionName: FUNCTION,
        args: [OVM_ETH, args.to, args.amount, args.minGasLimit, args.extraData ?? '0x'],
        value: args.amount,
        ...rest,
      })
    },
    ...writeReturn,
  } as unknown as UseWriteWithdrawETHReturnType<config, context>
}
