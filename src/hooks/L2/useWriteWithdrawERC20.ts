import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawERC20Parameters as WriteWithdrawERC20ActionParameters } from 'op-viem/actions'
import type { ContractFunctionArgs } from 'viem'
import { useWriteContract } from 'wagmi'
import type { WriteContractVariables } from 'wagmi/query'

import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type WriteWithdrawERC20Parameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // The CrossDomainMessenger will add the gas we need, so we can pass 0 to the contract by default & make the argument optional
  & { args: Omit<Pick<WriteWithdrawERC20ActionParameters, 'args'>['args'], 'minGasLimit'> & { minGasLimit?: number } }
  & { chainId: number }

export type UseWriteWithdrawERC20Parameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteWithdrawERC20ReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteWithdrawERC20Parameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeWithdrawERC20: UseWriteOPActionBaseReturnType<WriteWithdrawERC20Parameters, config, context>['write']
    writeWithdrawERC20Async: UseWriteOPActionBaseReturnType<
      WriteWithdrawERC20Parameters,
      config,
      context
    >['writeAsync']
  }

/**
 * Withdraws ERC20 tokens to an L1 address.
 * @param parameters - {@link UseWriteWithdrawERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawERC20ReturnType}
 */
export function useWriteWithdrawERC20<config extends Config = Config, context = unknown>(
  args: UseWriteWithdrawERC20Parameters<config, context> = {},
): UseWriteWithdrawERC20ReturnType<config, context> {
  const config = useOpConfig(args)
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract(args)

  const writeWithdrawERC20: UseWriteWithdrawERC20ReturnType<config, context>['writeWithdrawERC20'] = (
    { chainId, args, ...rest },
    options,
  ) => {
    const l2Chain = config.l2chains[chainId]

    if (!l2Chain) {
      throw new Error('L2 chain not configured')
    }

    return writeContract({
      chainId: l2Chain.chainId,
      address: l2Chain.l2Addresses.l2StandardBridge.address,
      abi: ABI,
      functionName: FUNCTION,
      args: [args.l2Token, args.to, args.amount, args.minGasLimit ?? 0, args.extraData || '0x'],
      ...rest,
    } as unknown as WriteContractVariables<
      typeof ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
      config,
      config['chains'][number]['id']
    >, options)
  }

  const writeWithdrawERC20Async: UseWriteWithdrawERC20ReturnType<config, context>['writeWithdrawERC20Async'] = (
    { chainId, args, ...rest },
    options,
  ) => {
    const l2Chain = config.l2chains[chainId]

    if (!l2Chain) {
      throw new Error('L2 chain not configured')
    }

    return writeContractAsync({
      chainId: l2Chain.chainId,
      address: l2Chain.l2Addresses.l2StandardBridge.address,
      abi: ABI,
      functionName: FUNCTION,
      args: [args.l2Token, args.to, args.amount, args.minGasLimit ?? 0, args.extraData || '0x'],
      ...rest,
    } as unknown as WriteContractVariables<
      typeof ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
      config,
      config['chains'][number]['id']
    >, options)
  }

  return {
    writeWithdrawERC20,
    writeWithdrawERC20Async,
    ...writeReturn,
  } as unknown as UseWriteWithdrawERC20ReturnType<config, context>
}
