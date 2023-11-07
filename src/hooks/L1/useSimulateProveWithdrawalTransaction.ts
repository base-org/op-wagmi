'use client'

import { l2OutputOracleABI, l2StandardBridgeABI, optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { useMemo } from 'react'
import { type Hash, pad } from 'viem'
import {
  useBlock,
  usePublicClient,
  useReadContract,
  useSimulateContract,
  type UseSimulateContractReturnType,
  useWaitForTransactionReceipt,
} from 'wagmi'
import type { BedrockCrossChainMessageProof } from '../../types/BedrockCrossChainMessageProof.js'
import type { UseSimulateOPActionBaseParameters } from '../../types/UseSimulateOPActionBaseParameters.js'
import type { UseSimulateOPActionBaseReturnType } from '../../types/UseSimulateOPActionBaseReturnType.js'
import { getMessageSlot } from '../../util/getMessageSlot.js'
import { useMakeStateTrieProof } from '../../util/getStateTrieProof.js'
import { getWithdrawalMessage } from '../../util/getWithdrawalMessage.js'
import { hashWithdrawal } from '../../util/hashWithdrawal.js'
import { useOpConfig } from '../useOpConfig.js'
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

export type UseProveWithdrawalTransactionReturnType<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = UseSimulateOPActionBaseReturnType<typeof ABI, typeof FUNCTION, config, chainId>

/**
 * Simulates a proof of ERC20 token withdrawal transaction to an L1 address.
 * @param parameters - {@link UseProveWithdrawalTransactionParameters}
 * @returns wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). {@link UseProveWithdrawalTransactionReturnType}
 */
export function useProveWithdrawalTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  { args, query: queryOverride }: UseProveWithdrawalTransactionParameters<config, chainId>,
): UseSimulateContractReturnType {
  const opConfig = useOpConfig()
  const l2Chain = opConfig.l2chains[args.l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const l2PublicClient = usePublicClient({ chainId: l2Chain.chainId })

  const { data: blockNumberOfLatestL2OutputProposal } = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'latestBlockNumber',
    args: [],
  })

  const { data: withdrawalOutputIndex } = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'getL2OutputIndexAfter',
    args: [blockNumberOfLatestL2OutputProposal || 0n],
    query: {
      enabled: Boolean(blockNumberOfLatestL2OutputProposal),
    },
  })

  const { data: proposal } = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'getL2Output',
  })

  const { data: withdrawalReceipt } = useWaitForTransactionReceipt({
    hash: args.l1WithdrawalTxHash,
    chainId: l2Chain.chainId,
  })

  const withdrawalMessage = useMemo(() => {
    if (!withdrawalReceipt) {
      return undefined
    }
    return getWithdrawalMessage(withdrawalReceipt, l2Chain.l2Addresses.l2L1MessagePasserAddress.address)
  }, [withdrawalReceipt, l2Chain])

  const messageBedrockOutput = useMemo(() => {
    if (!proposal || !withdrawalOutputIndex) {
      return undefined
    }
    return {
      outputRoot: proposal.outputRoot,
      l1Timestamp: proposal.timestamp,
      l2BlockNumber: proposal.l2BlockNumber,
      l2OutputIndex: withdrawalOutputIndex,
    }
  }, [withdrawalMessage, proposal, withdrawalOutputIndex])

  const hashedWithdrawal = useMemo(() => {
    if (withdrawalMessage === undefined) {
      return undefined
    }
    return hashWithdrawal(withdrawalMessage)
  }, [withdrawalMessage])

  const messageSlot = useMemo(() => {
    if (!hashedWithdrawal) {
      return undefined
    }
    return getMessageSlot(hashedWithdrawal)
  }, [hashedWithdrawal])

  const stateTrieProof = useMakeStateTrieProof(
    l2PublicClient,
    blockNumberOfLatestL2OutputProposal,
    l2Chain.l2Addresses.l2L1MessagePasserAddress.address,
    messageSlot,
  )

  const { data: block } = useBlock({
    chainId: l2Chain.chainId,
    blockNumber: blockNumberOfLatestL2OutputProposal,
  })

  const bedrockProof = useMemo(() => {
    if (!withdrawalMessage || !stateTrieProof || !block || !messageBedrockOutput) {
      return undefined
    }

    const bedrockProof: BedrockCrossChainMessageProof = {
      outputRootProof: {
        version: pad('0x0'),
        stateRoot: block.stateRoot,
        messagePasserStorageRoot: stateTrieProof.storageRoot,
        latestBlockhash: block.hash,
      },
      withdrawalProof: stateTrieProof.storageProof,
      l2OutputIndex: messageBedrockOutput.l2OutputIndex,
    }

    return bedrockProof
  }, [withdrawalMessage, blockNumberOfLatestL2OutputProposal, withdrawalOutputIndex])

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
