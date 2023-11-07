'use client'

import { l2StandardBridgeABI, optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { type Hash } from 'viem'
import { useSimulateContract } from 'wagmi'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import { useOpConfig } from '../useOpConfig.js'
import { useProveWithdrawalArgs } from './useProveWithdrawalArgs.js'
// import { getLatestProposedL2BlockNumber } from 'op-viem/actions/L1/getLatestProposedL2BlockNumber'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

export type UseProveWithdrawalTransactionParameters<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> =
  & UseSimulateOPActionBaseParameters<typeof ABI, typeof FUNCTION, config, chainId>
  & {
    args: {
      l1WithdrawalTxHash: Hash
      l2ChainId: number
    }
  }

/**
 * Simulates a proof of ERC20 token withdrawal transaction to an L1 address.
 * @param parameters - {@link UseProveWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseProveWithdrawalTransactionReturnType}
 */
export function useProveWithdrawalTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, query: queryOverride, config }: UseProveWithdrawalTransactionParameters<config, chainId>,
) {
  const opConfig = useOpConfig({ config })
  const l2Chain = opConfig.l2chains[args.l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const { withdrawalMessage, withdrawalOutputIndex, bedrockProof } = useProveWithdrawalArgs({
    l2ChainId: args.l2ChainId,
    config,
    l1WithdrawalTxHash: args.l1WithdrawalTxHash,
  })

  return useSimulateContract({
    abi: optimismPortalABI,
    address: l2Chain.l1Addresses.portal.address,
    functionName: 'proveWithdrawalTransaction',
    args: !withdrawalMessage || !withdrawalOutputIndex || !bedrockProof ? undefined : [
      withdrawalMessage,
      withdrawalOutputIndex,
      bedrockProof.outputRootProof,
      bedrockProof.withdrawalProof,
    ],
    query: {
      enabled: Boolean(withdrawalMessage && withdrawalOutputIndex && bedrockProof),
      ...queryOverride,
    },
  })
}
