import { useMutation } from '@tanstack/react-query'
import { type Config, getChainId, getPublicClient, getWalletClient, type ResolvedRegister } from '@wagmi/core'
import {
  simulateWithdrawETH,
  writeWithdrawETH,
  type WriteWithdrawETHParameters as WriteWithdrawETHActionParameters,
} from 'op-viem/actions'
import { useConfig, type UseConfigReturnType } from 'wagmi'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'

export type WriteWithdrawETHParameters = Omit<WriteWithdrawETHActionParameters, 'account'> & { chainId?: number }

export type UseWriteWithdrawETHParameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<
    WriteWithdrawETHParameters,
    config,
    context
  >

export type UseWriteWithdrawETHReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeWithdrawETH: UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>['write']
    writeWithdrawETHAsync: UseWriteOPActionBaseReturnType<WriteWithdrawETHParameters, config, context>['writeAsync']
  }

async function writeMutation(
  config: UseConfigReturnType,
  { chainId, ...params }: WriteWithdrawETHParameters,
) {
  const currentChainId = getChainId(config)
  if (currentChainId !== chainId) throw new Error('chain mismatch')

  const walletClient = await getWalletClient(config)
  if (!walletClient) throw new Error('no account connected')
  const publicClient = await getPublicClient(config)

  await simulateWithdrawETH(publicClient, { ...params, account: walletClient.account.address, chain: undefined })
  return writeWithdrawETH(walletClient, { ...params, account: walletClient.account.address, chain: undefined })
}

/**
 * Withdraws ETH to an L1 address.
 * @param parameters - {@link UseWriteWithdrawETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteWithdrawETHReturnType}
 */
export function useWriteWithdrawETH<config extends Config = ResolvedRegister['config'], context = unknown>(
  { mutation: mutationOverride }: UseWriteWithdrawETHParameters<config, context> = {},
): UseWriteWithdrawETHReturnType<config, context> {
  const config = useConfig()

  const mutation = {
    mutationFn(params: WriteWithdrawETHParameters) {
      return writeMutation(config, params)
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation({ ...mutation, ...mutationOverride })

  type Return = UseWriteWithdrawETHReturnType<config, context>
  return {
    ...result,
    writeWithdrawETH: mutate,
    writeWithdrawETHAsync: mutateAsync,
  } as Return
}
