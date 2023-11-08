import { createConfig, http } from '@wagmi/core'
import { mock } from '@wagmi/core/internal'
import { base as viem_base } from 'viem/chains'
import { accounts } from './constants.js'
import { getRpcUrls } from './utils.js'

const base = {
  ...getRpcUrls({ port: 8547 }),
  ...viem_base,
  fork: {
    blockNumber: process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER
      ? BigInt(Number(process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER))
      : 5940037n,
    url: process.env.VITE_OPTIMISM_FORK_URL ?? 'https://mainnet.base.org',
  },
}

export const config = createConfig({
  chains: [base],
  connectors: [mock({ accounts })],
  pollingInterval: 100,
  storage: null,
  transports: {
    [base.id]: http(),
  },
})
