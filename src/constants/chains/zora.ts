import { zoraAddresses } from 'op-viem/chains'
import type { L2Chain } from '../../types/OpConfig.js'

export const zora: L2Chain<number, number> = {
  chainId: 7777777,
  l1ChaindId: 1,
  l1Addresses: zoraAddresses,
  l2Addresses: {
    l2L1MessagePasserAddress: { address: '0x4200000000000000000000000000000000000016', chainId: 7777777 },
    l2StandardBridge: { address: '0x4200000000000000000000000000000000000010', chainId: 7777777 },
  },
} as const
