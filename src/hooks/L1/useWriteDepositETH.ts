import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { useMutation } from '@tanstack/react-query'
import { type Config, getPublicClient, getWalletClient } from '@wagmi/core'
import {
  simulateDepositETH,
  writeDepositETH,
  type WriteDepositETHParameters as WriteDepositETHActionParameters,
} from 'op-viem/actions'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import type { WriteOPContractBaseParameters } from '../../types/WriteOPContractBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'

const ABI = optimismPortalABI
const FUNCTION = 'depositTransaction'

export type WriteDepositETHParameters<
  config extends Config = OpConfig,
  chainId extends config['chains'][number]['id'] = number,
> =
  & WriteOPContractBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  // We'll estimate the L2 gas needed so we can make the gasLimit argument optional
  & { args: Omit<Pick<WriteDepositETHActionParameters, 'args'>['args'], 'gasLimit'> & { gasLimit?: number } }
  & { l2ChainId: number }

export type UseWriteDepositETHParameters<config extends Config = OpConfig, context = unknown> =
  UseWriteOPActionBaseParameters<config, context>

export type UseWriteDepositETHReturnType<config extends Config = OpConfig, context = unknown> =
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
}

async function writeMutation(
  config: OpConfig,
  { l1ChainId, l2ChainId, args, ...rest }: DepositETHMutationParameters,
) {
  const walletClient = await getWalletClient(config, { chainId: l1ChainId })
  const l1PublicClient = getPublicClient(config, { chainId: l1ChainId })
  const l2PublicClient = getPublicClient(config, { chainId: l2ChainId })
  const l1Addresses = config.l2chains[l2ChainId].l1Addresses

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
    ...l1Addresses,
    ...rest,
  })
  return writeDepositETH(walletClient, {
    args: { ...args, gasLimit: l2GasLimit },
    account: walletClient.account.address,
    ...l1Addresses,
    ...rest,
  })
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteDepositETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositETHReturnType}
 */
export function useWriteDepositETH<config extends Config = OpConfig, context = unknown>(
  args: UseWriteDepositETHParameters<config, context> = {},
): UseWriteDepositETHReturnType<config, context> {
  const opConfig = useOpConfig(args)

  const mutation = {
    mutationFn({ l2ChainId, args, ...rest }: WriteDepositETHParameters) {
      const l2Chain = opConfig.l2chains[l2ChainId]

      if (!l2Chain) {
        throw new Error('L2 chain not configured')
      }

      return writeMutation(opConfig, { args, l1ChainId: l2Chain.l1ChainId, l2ChainId: l2ChainId, ...rest })
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
