import { optimismAddresses } from 'op-viem/chains'
import type { L2Chain } from '../../types/OpConfig.js'

export const optimism: L2Chain<number, number> = {
  chainId: 10,
  l1ChaindId: 1,
  l1Addresses: optimismAddresses,
  l2Addresses: {
    l2L1MessagePasserAddress: { address: '0x4200000000000000000000000000000000000016', chainId: 10 },
    l2StandardBridge: { address: '0x4200000000000000000000000000000000000010', chainId: 10 },
  },
} as const
