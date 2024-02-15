import type { Chain, ChainContract } from 'viem'
import type { Config } from 'wagmi'
import {
  l1StandardBridgeContractNotConfiguredMessage,
  L2ChainMissingSourceChainMessage,
  L2ChainNotConfiguredMessage,
  l2OutputOracleContractNotConfiguredMessage,
  l2StandardBridgeContractNotConfiguredMessage,
  l2ToL1MessagePasserContractNotConfiguredMessage,
  PortalContractNotConfiguredMessage,
} from '../constants/errorMessages.js'

export function validateL2Chain(config: Config, l2ChainId: number) {
  const l2Chain = config.chains.find((chain) => chain.id === l2ChainId)

  if (!l2Chain) {
    throw new Error(L2ChainNotConfiguredMessage(l2ChainId))
  }
  if (!l2Chain.sourceId) {
    throw new Error(L2ChainMissingSourceChainMessage(l2Chain.name))
  }

  return { l2Chain, l1ChainId: l2Chain.sourceId }
}

export function validatePortalContract(l1ChainId: number, l2Chain: Chain) {
  const portal: ChainContract | undefined = l2Chain?.contracts?.portal
    ?.[l1ChainId as keyof typeof l2Chain.contracts.portal]

  if (!portal) {
    throw new Error(PortalContractNotConfiguredMessage(l1ChainId, l2Chain.name))
  }

  return portal as ChainContract
}

export function validateL2OutputOracleContract(l1ChainId: number, l2Chain: Chain) {
  const l2OutputOracle: ChainContract | undefined = l2Chain?.contracts?.l2OutputOracle
    ?.[l1ChainId as keyof typeof l2Chain.contracts.portal]

  if (!l2OutputOracle) {
    throw new Error(l2OutputOracleContractNotConfiguredMessage(l2Chain.name))
  }

  return l2OutputOracle as ChainContract
}

export function validatel2ToL1MessagePasserContract(l2Chain: Chain) {
  const l2ToL1MessagePasser = l2Chain?.contracts?.l2ToL1MessagePasser as
    | ChainContract
    | undefined

  if (!l2ToL1MessagePasser) {
    throw new Error(
      l2ToL1MessagePasserContractNotConfiguredMessage(l2Chain.name),
    )
  }

  return l2ToL1MessagePasser as ChainContract
}

export function validatel1StandardBridgeContract(l1ChainId: number, l2Chain: Chain) {
  const l1StandardBridge: ChainContract | undefined = l2Chain?.contracts?.l1StandardBridge
    ?.[l1ChainId as keyof typeof l2Chain.contracts.l1StandardBridge]

  if (!l1StandardBridge) {
    // FIXME: Link to documentation for this
    throw new Error(
      l1StandardBridgeContractNotConfiguredMessage(l2Chain.name),
    )
  }

  return l1StandardBridge as ChainContract
}

export function validateL2StandardBridgeContract(l2Chain: Chain) {
  const l2StandardBridge = l2Chain?.contracts?.l2StandardBridge as ChainContract | undefined

  if (!l2StandardBridge) {
    throw new Error(
      l2StandardBridgeContractNotConfiguredMessage(l2Chain.name),
    )
  }

  return l2StandardBridge as ChainContract
}
