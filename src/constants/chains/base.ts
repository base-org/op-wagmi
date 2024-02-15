import { baseAddresses } from 'op-viem/chains'
import { base as viem_base, type Chain, mainnet } from 'viem/chains'

export const base: Chain = {
  ...viem_base,
  contracts: {
    ...viem_base.contracts,
    l1StandardBridge: {
      [mainnet.id]: {
        address: baseAddresses.l1StandardBridge.address,
        blockCreated: baseAddresses.l1StandardBridge.blockCreated,
      },
    },
  },
}
