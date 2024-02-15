import { optimismAddresses } from 'op-viem/chains'
import { type Chain, mainnet, optimism as viem_optimism } from 'viem/chains'

export const optimism: Chain = {
  ...viem_optimism,
  contracts: {
    ...viem_optimism.contracts,
    l1StandardBridge: {
      [mainnet.id]: {
        address: optimismAddresses.l1StandardBridge.address,
        blockCreated: optimismAddresses.l1StandardBridge.blockCreated,
      },
    },
  },
}
