import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config } from '@wagmi/core'
import { type WriteDepositERC20Parameters as WriteDepositERC20ActionParameters } from 'op-viem/actions'
import type { ContractFunctionArgs } from 'viem'
import { useAccount, useConfig, useWriteContract } from 'wagmi'
import type { WriteContractVariables } from 'wagmi/query'

import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { validatel1StandardBridgeContract, validateL2Chain } from '../../util/validateChains.js'

const ABI = l1StandardBridgeABI
const FUNCTION = 'depositERC20To'

export type WriteDepositERC20Parameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // The L1CrossDomainMessenger will add the L2 gas we need, so we can pass 0 to the contract by default & make the argument optional
  & { args: Omit<Pick<WriteDepositERC20ActionParameters, 'args'>['args'], 'minGasLimit'> & { minGasLimit?: number } }
  & { l2ChainId: number }

export type UseWriteDepositERC20Parameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteDepositERC20ReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositERC20: UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>['write']
    writeDepositERC20Async: UseWriteOPActionBaseReturnType<
      WriteDepositERC20Parameters,
      config,
      context
    >['writeAsync']
  }

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link UseWriteDepositERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositERC20ReturnType}
 */
export function useWriteDepositERC20<config extends Config = Config, context = unknown>(
  args: UseWriteDepositERC20Parameters<config, context> = {},
): UseWriteDepositERC20ReturnType<config, context> {
  const config = useConfig(args)
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract(args)
  const account = useAccount(args)

  const writeDepositERC20: UseWriteDepositERC20ReturnType<config, context>['writeDepositERC20'] = (
    { l2ChainId, args, ...rest },
    options,
  ) => {
    const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)
    const l1StandardBridge = validatel1StandardBridgeContract(l1ChainId, l2Chain).address

    return writeContract(
      {
        chainId: l1ChainId,
        address: l1StandardBridge,
        abi: ABI,
        functionName: FUNCTION,
        args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit ?? 0, args.extraData ?? '0x'],
        account: account.address,
        ...rest,
      } as unknown as WriteContractVariables<
        typeof ABI,
        typeof FUNCTION,
        ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
        config,
        config['chains'][number]['id']
      >,
      options,
    )
  }

  const writeDepositERC20Async: UseWriteDepositERC20ReturnType<config, context>['writeDepositERC20Async'] = (
    { l2ChainId, args, ...rest },
    options,
  ) => {
    const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)
    const l1StandardBridge = validatel1StandardBridgeContract(l1ChainId, l2Chain).address

    return writeContractAsync({
      chainId: l1ChainId,
      address: l1StandardBridge,
      abi: ABI,
      functionName: FUNCTION,
      args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit ?? 0, args.extraData ?? '0x'],
      account: account.address,
      ...rest,
    } as unknown as WriteContractVariables<
      typeof ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
      config,
      config['chains'][number]['id']
    >, options)
  }

  return {
    writeDepositERC20,
    writeDepositERC20Async,
    ...writeReturn,
  } as unknown as UseWriteDepositERC20ReturnType<config, context>
}
