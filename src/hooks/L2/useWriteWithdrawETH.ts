import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteWithdrawETHParameters as WriteWithdrawETHActionParameters } from 'op-viem/actions'
import type { ContractFunctionArgs } from 'viem'
import { useAccount, useConfig, useWriteContract } from 'wagmi'
import type { WriteContractVariables } from 'wagmi/query'

import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'

import { validateL2Chain, validateL2StandardBridgeContract } from '../../util/validateChains.js'
import { OVM_ETH } from './useSimulateWithdrawETH.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type WriteWithdrawETHParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // The CrossDomainMessenger will add the gas we need, so we can pass 0 to the contract by default & make the argument optional
  & { args: Omit<Pick<WriteWithdrawETHActionParameters, 'args'>['args'], 'minGasLimit'> & { minGasLimit?: number } }
  & { chainId: number }

export type UseWriteWithdrawETHParameters<config extends Config = Config, context = unknown> =
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
export function useWriteWithdrawETH<config extends Config = Config, context = unknown>(
  args: UseWriteWithdrawETHParameters<config, context> = {},
): UseWriteWithdrawETHReturnType<config, context> {
  const config = useConfig(args)
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract(args)
  const account = useAccount(args)

  const writeWithdrawETH: UseWriteWithdrawETHReturnType<config, context>['writeWithdrawETH'] = (
    { chainId, args, ...rest },
    options,
  ) => {
    const { l2Chain } = validateL2Chain(config, chainId)
    const l2StandardBridge = validateL2StandardBridgeContract(l2Chain).address

    return writeContract({
      chainId: l2Chain.id,
      address: l2StandardBridge,
      abi: ABI,
      functionName: FUNCTION,
      args: [OVM_ETH, args.to, args.amount, args.minGasLimit ?? 0, args.extraData ?? '0x'],
      value: args.amount,
      account: account.address,
      ...rest,
    } as unknown as WriteContractVariables<
      typeof ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
      config,
      config['chains'][number]['id']
    >, options)
  }

  const writeWithdrawETHAsync: UseWriteWithdrawETHReturnType<config, context>['writeWithdrawETHAsync'] = (
    { chainId, args, ...rest },
    options,
  ) => {
    const { l2Chain } = validateL2Chain(config, chainId)
    const l2StandardBridge = validateL2StandardBridgeContract(l2Chain).address

    return writeContractAsync({
      chainId: l2Chain.id,
      address: l2StandardBridge,
      abi: ABI,
      functionName: FUNCTION,
      args: [OVM_ETH, args.to, args.amount, args.minGasLimit ?? 0, args.extraData ?? '0x'],
      value: args.amount,
      account: account.address,
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
    writeWithdrawETH,
    writeWithdrawETHAsync,
    ...writeReturn,
  } as unknown as UseWriteWithdrawETHReturnType<config, context>
}
