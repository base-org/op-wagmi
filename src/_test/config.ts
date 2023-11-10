import { createConfig, http } from '@wagmi/core'
import { mock } from '@wagmi/core/internal'
import { opStackL2ChainContracts } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { base as viem_base, mainnet } from 'viem/chains'
import { type OpConfig } from '../types/OpConfig.js'
import { accounts } from './constants.js'
import { getRpcUrls } from './utils.js'

const base = {
  chainId: viem_base.id,
  l1ChaindId: mainnet.id,
  l1Addresses: baseAddresses,
  l2Addresses: opStackL2ChainContracts,
  ...getRpcUrls({ port: 8547 }),
  ...viem_base,
  fork: {
    blockNumber: process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER
      ? BigInt(Number(process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER))
      : 5940037n,
    url: process.env.VITE_OPTIMISM_FORK_URL ?? 'https://mainnet.base.org',
  },
}

export const config: OpConfig = {
  l2chains: {
    // @ts-expect-error this seems to have a mismatch that is likely a bug
    [base.id]: base,
  },

  ...createConfig({
    chains: [base],
    connectors: [mock({ accounts })],
    pollingInterval: 100,
    storage: null,
    transports: {
      [base.id]: http(),
    },
  }),
}
