import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Hash } from 'viem'
import { type UseSimulateContractParameters, useWriteContract } from 'wagmi'
import type { WithdrawalMessage } from '../../types/WithdrawalMessage.js'
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

type OutputRootProof = {
  version: `0x${string}`
  stateRoot: `0x${string}`
  messagePasserStorageRoot: `0x${string}`
  latestBlockhash: `0x${string}`
}

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteDepositETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositETHReturnType}
 */
export function useWriteDepositETH({ args, ...rest }: UseProveWithdrawalTransactionParameters) {
  const { writeContract, writeContractAsync } = useWriteContract()

  const opConfig = useOpConfig(rest)
  const l2Chain = opConfig.l2chains[args.l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const { withdrawalMessage, withdrawalOutputIndex, bedrockProof } = useProveWithdrawalArgs({
    l2ChainId: args.l2ChainId,
    config: opConfig,
    l1WithdrawalTxHash: args.l1WithdrawalTxHash,
  })

  const ready = Boolean(withdrawalMessage && withdrawalOutputIndex && bedrockProof)

  return {
    writeDepositETH: ready
      ? () =>
        writeContract({
          chainId: l2Chain.l1ChaindId,
          abi: optimismPortalABI,
          address: l2Chain.l1Addresses.portal.address,
          functionName: 'proveWithdrawalTransaction',
          args: [
            withdrawalMessage as WithdrawalMessage,
            withdrawalOutputIndex as bigint,
            bedrockProof?.outputRootProof as OutputRootProof,
            bedrockProof?.withdrawalProof as `0x${string}`[],
          ],
        })
      : undefined,
    writeDepositETHAsync: ready
      ? () =>
        writeContractAsync({
          chainId: l2Chain.l1ChaindId,
          abi: optimismPortalABI,
          address: l2Chain.l1Addresses.portal.address,
          functionName: 'proveWithdrawalTransaction',
          args: [
            withdrawalMessage as WithdrawalMessage,
            withdrawalOutputIndex as bigint,
            bedrockProof?.outputRootProof as OutputRootProof,
            bedrockProof?.withdrawalProof as `0x${string}`[],
          ],
        })
      : undefined,
    ready,
  }
}
