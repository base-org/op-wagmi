import type { Address } from 'viem'
import { type Config } from 'wagmi'

// TODO: export these from op-viem and import here
export type ContractAddress<chainId = number> = { address: Address; chainId: chainId; blockCreated?: number }
export type L1Addresses<chainId = number> = {
  portal: ContractAddress<chainId>
  l2OutputOracle: ContractAddress<chainId>
  l1StandardBridge: ContractAddress<chainId>
  l1CrossDomainMessenger: ContractAddress<chainId>
  l1Erc721Bridge: ContractAddress<chainId>
}

export type L2Addresses<chainId = number> = {
  l2L1MessagePasserAddress: ContractAddress<chainId>
  l2StandardBridge: ContractAddress<chainId>
}

export type L2Chain<l1ChainId extends number, l2ChainId extends number> = {
  chainId: l2ChainId
  l1ChaindId: l1ChainId
  l1Addresses: L1Addresses<l1ChainId>
  l2Addresses: L2Addresses<l2ChainId>
}

export type OpConfig = Config & {
  readonly l2chains: Record<number, L2Chain<number, number>>
}
