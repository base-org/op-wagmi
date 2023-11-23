import { baseGoerliAddresses } from 'op-viem/chains'
import type { L2Chain } from '../../types/OpConfig.js'

export const baseGoerli: L2Chain<number, number> = {
  chainId: 84531,
  l1ChainId: 5,
  l1Addresses: baseGoerliAddresses,
  l2Addresses: {
    l2L1MessagePasserAddress: { address: '0x4200000000000000000000000000000000000016', chainId: 84531 },
    l2StandardBridge: { address: '0x4200000000000000000000000000000000000010', chainId: 84531 },
  },
} as const
