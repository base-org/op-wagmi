import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import { useMemo } from 'react'
import { type Hash, pad } from 'viem'
import { useBlock, useConfig, usePublicClient, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import type { BedrockCrossChainMessageProof } from '../../types/BedrockCrossChainMessageProof.js'
import { getMessageSlot } from '../../util/getMessageSlot.js'
import { useMakeStateTrieProof } from '../../util/getStateTrieProof.js'
import { getWithdrawalMessage } from '../../util/getWithdrawalMessage.js'
import { hashWithdrawal } from '../../util/hashWithdrawal.js'

import {
  validateL2Chain,
  validateL2OutputOracleContract,
  validatel2ToL1MessagePasserContract,
} from '../../util/validateChains.js'
import { useBlockNumberOfLatestL2OutputProposal } from './useBlockNumberOfLatestL2OutputProposal.js'
import { useGetL2OutputIndexAfter } from './useGetL2OutputIndexAfter.js'

export function useProveWithdrawalArgs({
  l2ChainId,
  withdrawalTxHash,
}: {
  withdrawalTxHash: Hash
  l2ChainId: number
}) {
  const config = useConfig()
  const { l1ChainId, l2Chain } = validateL2Chain(config, l2ChainId)
  const l2OutputOracle = validateL2OutputOracleContract(l1ChainId, l2Chain).address
  const l2ToL1MessagePasser = validatel2ToL1MessagePasserContract(l2Chain).address

  const l2PublicClient = usePublicClient({ chainId: l2Chain.id })!

  const { data: blockNumberOfLatestL2OutputProposal } = useBlockNumberOfLatestL2OutputProposal({
    config,
    l2ChainId: l2ChainId,
  })

  const { data: withdrawalOutputIndex } = useGetL2OutputIndexAfter({
    blockNumber: blockNumberOfLatestL2OutputProposal,
    l2ChainId,
    config,
  })

  const { data: proposal } = useReadContract({
    abi: l2OutputOracleABI,
    address: l2OutputOracle,
    functionName: 'getL2Output',
  })

  const { data: withdrawalReceipt } = useWaitForTransactionReceipt({
    hash: withdrawalTxHash,
    chainId: l2Chain.id,
  })

  const withdrawalMessage = useMemo(() => {
    if (!withdrawalReceipt) {
      return undefined
    }
    return getWithdrawalMessage(withdrawalReceipt, l2ToL1MessagePasser)
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
    l2ToL1MessagePasser,
    messageSlot,
  )

  const { data: block } = useBlock({
    chainId: l2Chain.id,
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
