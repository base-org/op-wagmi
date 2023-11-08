'use client'

import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type Hash } from 'viem'
import { useSimulateContract, type UseSimulateContractParameters } from 'wagmi'
import { useOpConfig } from '../useOpConfig.js'
import { useProveWithdrawalArgs } from './useProveWithdrawalArgs.js'

export type UseProveWithdrawalTransactionParameters =
  & UseSimulateContractParameters
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
export function useProveWithdrawalTransaction(
  { args, query: queryOverride, config }: UseProveWithdrawalTransactionParameters,
) {
  const opConfig = useOpConfig({ config })
  const l2Chain = opConfig.l2chains[args.l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const { withdrawalMessage, withdrawalOutputIndex, bedrockProof } = useProveWithdrawalArgs({
    l2ChainId: args.l2ChainId,
    config: opConfig,
    l1WithdrawalTxHash: args.l1WithdrawalTxHash,
  })

  return useSimulateContract({
    chainId: l2Chain.l1ChaindId,
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
