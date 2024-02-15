import { zoraAddresses } from 'op-viem/chains'
import { type Chain, mainnet, zora as viem_zora } from 'viem/chains'

export const zora: Chain = {
  ...viem_zora,
  contracts: {
    ...viem_zora.contracts,
    l1StandardBridge: {
      [mainnet.id]: {
        address: zoraAddresses.l1StandardBridge.address,
        blockCreated: zoraAddresses.l1StandardBridge.blockCreated,
      },
    },
  },
}
