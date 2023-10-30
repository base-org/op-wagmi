import { useMutation } from '@tanstack/react-query'
import { type Config, getChainId, getPublicClient, getWalletClient, type ResolvedRegister } from '@wagmi/core'
import {
  simulateDepositETH,
  writeDepositETH,
  type WriteDepositETHParameters as WriteDepositETHActionParameters,
} from 'op-viem/actions'
import { useConfig, type UseConfigReturnType } from 'wagmi'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'

export type WriteDepositETHParameters = Omit<WriteDepositETHActionParameters, 'account'> & { chainId?: number }

export type UseWriteDepositETHParameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<WriteDepositETHParameters, config, context>

export type UseWriteDepositETHReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositETH: UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>['write']
    writeDepositETHAsync: UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>['writeAsync']
  }

async function writeMutation(
  config: UseConfigReturnType,
  { chainId, ...params }: WriteDepositETHParameters,
) {
  const currentChainId = getChainId(config)
  if (currentChainId !== chainId) throw new Error('chain mismatch')

  const walletClient = await getWalletClient(config)
  if (!walletClient) throw new Error('no account connected')
  const publicClient = await getPublicClient(config)

  await simulateDepositETH(publicClient, { ...params, account: walletClient.account.address, chain: undefined })
  return writeDepositETH(walletClient, { ...params, account: walletClient.account.address, chain: undefined })
}

export function useWriteDepositETH<config extends Config = ResolvedRegister['config'], context = unknown>(
  { mutation: mutationOverride }: UseWriteDepositETHParameters<config, context> = {},
): UseWriteDepositETHReturnType<config, context> {
  const config = useConfig()

  const mutation = {
    mutationFn(params: WriteDepositETHParameters) {
      return writeMutation(config, params)
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation({ ...mutation, ...mutationOverride })

  type Return = UseWriteDepositETHReturnType<config, context>
  return {
    ...result,
    writeDepositETH: mutate,
    writeDepositETHAsync: mutateAsync,
  } as Return
}
