import { optimismGoerliAddresses } from 'op-viem/chains'
import type { L2Chain } from '../../types/OpConfig.js'

export const optimismGoerli: L2Chain<number, number> = {
  chainId: 420,
  l1ChainId: 5,
  l1Addresses: optimismGoerliAddresses,
  l2Addresses: {
    l2L1MessagePasserAddress: { address: '0x4200000000000000000000000000000000000016', chainId: 420 },
    l2StandardBridge: { address: '0x4200000000000000000000000000000000000010', chainId: 420 },
  },
} as const
