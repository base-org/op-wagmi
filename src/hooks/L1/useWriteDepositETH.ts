import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useMutation } from '@tanstack/react-query'
import { type Config, getPublicClient, getWalletClient } from '@wagmi/core'
import {
  simulateDepositETH,
  writeDepositETH,
  type WriteDepositETHParameters as WriteDepositETHActionParameters,
} from 'op-viem/actions'
import type { Chain } from 'viem'
import { useConfig } from 'wagmi'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { validateL2Chain, validatePortalContract } from '../../util/validateChains.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type WriteDepositETHParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // We'll estimate the L2 gas needed so we can make the gasLimit argument optional
  & { args: Omit<Pick<WriteDepositETHActionParameters, 'args'>['args'], 'gasLimit'> & { gasLimit?: number } }
  & { l2ChainId: number }

export type UseWriteDepositETHParameters<config extends Config = Config, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteDepositETHReturnType<config extends Config = Config, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositETH: UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>['write']
    writeDepositETHAsync: UseWriteOPActionBaseReturnType<
      WriteDepositETHParameters,
      config,
      context
    >['writeAsync']
  }

type DepositETHMutationParameters = WriteDepositETHParameters & {
  l1ChainId: number
  l2Chain: Chain
}

async function writeMutation(
  config: Config,
  { l1ChainId, l2ChainId, l2Chain, args, ...rest }: DepositETHMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId })
  const l1PublicClient = await getPublicClient(config, { chainId: l1ChainId })!
  const l2PublicClient = await getPublicClient(config, { chainId: l2ChainId })!

  const portal = validatePortalContract(l1ChainId, l2Chain).address

  const l2GasLimit = args.gasLimit
    ?? Number(
      await l2PublicClient.estimateGas({
        account: walletClient.account.address,
        to: args.to,
        value: args.amount,
        data: args.data,
      }),
    )

  await simulateDepositETH(l1PublicClient, {
    args: { ...args, gasLimit: l2GasLimit },
    account: walletClient.account.address,
    portal,
    ...rest,
  })
  return writeDepositETH(walletClient, {
    args: { ...args, gasLimit: l2GasLimit },
    account: walletClient.account.address,
    portal,
    ...rest,
  })
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteDepositETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositETHReturnType}
 */
export function useWriteDepositETH<config extends Config = Config, context = unknown>(
  args: UseWriteDepositETHParameters<config, context> = {},
): UseWriteDepositETHReturnType<config, context> {
  const config = useConfig(args)

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteDepositETHParameters) {
      const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)

      return writeMutation(config, {
        args,
        l1ChainId,
        l2ChainId: l2ChainId,
        l2Chain,
        ...rest,
      })
    },
    mutationKey: ['writeContract'],
  }

  const { mutate, mutateAsync, ...result } = useMutation(mutation)

  return {
    ...result,
    writeDepositETH: mutate,
    writeDepositETHAsync: mutateAsync,
  } as unknown as UseWriteDepositETHReturnType<config, context>
}
