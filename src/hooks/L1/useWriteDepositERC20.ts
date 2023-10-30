import { useMutation } from '@tanstack/react-query'
import { type Config, getChainId, getPublicClient, getWalletClient, type ResolvedRegister } from '@wagmi/core'
import {
  simulateDepositERC20,
  writeDepositERC20,
  type WriteDepositERC20Parameters as WriteDepositERC20ActionParameters,
} from 'op-viem/actions'
import { useConfig, type UseConfigReturnType } from 'wagmi'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'

export type WriteDepositERC20Parameters = Omit<WriteDepositERC20ActionParameters, 'account'> & { chainId?: number }

export type UseWriteDepositERC20Parameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<WriteDepositERC20Parameters, config, context>

export type UseWriteDepositERC20ReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositERC20: UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>['write']
    writeDepositERC20Async: UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>['writeAsync']
  }

async function writeMutation(
  config: UseConfigReturnType,
  { chainId, ...params }: WriteDepositERC20Parameters,
) {
  const currentChainId = getChainId(config)
  if (currentChainId !== chainId) throw new Error('chain mismatch')

  const walletClient = await getWalletClient(config)
  if (!walletClient) throw new Error('no account connected')
  const publicClient = await getPublicClient(config)

  await simulateDepositERC20(publicClient, { ...params, account: walletClient.account.address, chain: undefined })
  return writeDepositERC20(walletClient, { ...params, account: walletClient.account.address, chain: undefined })
}

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link UseWriteDepositERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositERC20ReturnType}
 */
export function useWriteDepositERC20<config extends Config = ResolvedRegister['config'], context = unknown>(
  { mutation: mutationOverride }: UseWriteDepositERC20Parameters<config, context> = {},
): UseWriteDepositERC20ReturnType<config, context> {
  const config = useConfig()

  const mutation = {
    mutationFn(params: WriteDepositERC20Parameters) {
      return writeMutation(config, params)
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation({ ...mutation, ...mutationOverride })

  type Return = UseWriteDepositERC20ReturnType<config, context>
  return {
    ...result,
    writeDepositERC20: mutate,
    writeDepositERC20Async: mutateAsync,
  } as Return
}
