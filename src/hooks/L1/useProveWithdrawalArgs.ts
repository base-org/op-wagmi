import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import { useMemo } from 'react'
import { type Hash, pad } from 'viem'
import { type Config, useBlock, usePublicClient, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import type { BedrockCrossChainMessageProof } from '../../types/BedrockCrossChainMessageProof.js'
import { getMessageSlot } from '../../util/getMessageSlot.js'
import { useMakeStateTrieProof } from '../../util/getStateTrieProof.js'
import { getWithdrawalMessage } from '../../util/getWithdrawalMessage.js'
import { hashWithdrawal } from '../../util/hashWithdrawal.js'
import { useOpConfig } from '../useOpConfig.js'
import { useBlockNumberOfLatestL2OutputProposal } from './useBlockNumberOfLatestL2OutputProposal.js'
import { useGetL2OutputIndexAfter } from './useGetL2OutputIndexAfter.js'

export function useProveWithdrawalArgs({
  l2ChainId,
  config,
  l1WithdrawalTxHash,
}: {
  l1WithdrawalTxHash: Hash
  l2ChainId: number
  config?: Config
}) {
  const opConfig = useOpConfig({ config })
  const l2Chain = opConfig.l2chains[l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const l2PublicClient = usePublicClient({ chainId: l2Chain.chainId })

  const { data: blockNumberOfLatestL2OutputProposal } = useBlockNumberOfLatestL2OutputProposal({
    config: opConfig,
    l2ChainId: l2ChainId,
  })

  const { data: withdrawalOutputIndex } = useGetL2OutputIndexAfter({
    blockNumber: blockNumberOfLatestL2OutputProposal,
    l2ChainId,
    config: opConfig,
  })

  const { data: proposal } = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'getL2Output',
  })

  const { data: withdrawalReceipt } = useWaitForTransactionReceipt({
    hash: l1WithdrawalTxHash,
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

  return {
    withdrawalMessage,
    withdrawalOutputIndex,
    bedrockProof,
  }
}
