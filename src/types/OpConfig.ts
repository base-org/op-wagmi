import type { Address } from 'viem'
import { type Config } from 'wagmi'

// TODO: export these from op-viem and import here
export type ContractAddress<chainId = number> = { address: Address; chainId: chainId; blockCreated?: number }
export type Addresses<chainId = number> = {
  portal: ContractAddress<chainId>
  l2OutputOracle: ContractAddress<chainId>
  l1StandardBridge: ContractAddress<chainId>
  l1CrossDomainMessenger: ContractAddress<chainId>
  l1Erc721Bridge: ContractAddress<chainId>
}

export type L2Chain<l1ChainId extends number> = {
  chainId: number
  l1ChaindId: l1ChainId
  l1Addresses: Addresses<l1ChainId>
}

export type OpConfig = Config & {
  readonly l2chains: Record<number, L2Chain<number>>
}
