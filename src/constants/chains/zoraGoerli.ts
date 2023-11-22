import { zoraGoerliAddresses } from 'op-viem/chains'
import type { L2Chain } from '../../types/OpConfig.js'

export const zoraGoerli: L2Chain<number, number> = {
  chainId: 999,
  l1ChaindId: 5,
  l1Addresses: zoraGoerliAddresses,
  l2Addresses: {
    l2L1MessagePasserAddress: { address: '0x4200000000000000000000000000000000000016', chainId: 999 },
    l2StandardBridge: { address: '0x4200000000000000000000000000000000000010', chainId: 999 },
  },
} as const
