import { mock } from '@wagmi/connectors'
import { base as viem_base, mainnet as viem_mainnet } from 'viem/chains'
import { type Config, createConfig, http } from 'wagmi'
import { accounts } from './constants.js'
import { getRpcUrls } from './utils.js'

const mainnet = {
  ...viem_mainnet,
  ...getRpcUrls({ port: 8545 }),
  // fork: {
  //   blockNumber: process.env.VITE_MAINNET_FORK_BLOCK_NUMBER
  //     ? BigInt(Number(process.env.VITE_MAINNET_FORK_BLOCK_NUMBER))
  //     : 18136086n,
  //   url: process.env.VITE_MAINNET_FORK_URL ?? 'https://cloudflare-eth.com',
  // },
}

const base = {
  ...viem_base,
  ...getRpcUrls({ port: 8546 }),
  // fork: {
  //   blockNumber: process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER
  //     ? BigInt(Number(process.env.VITE_OPTIMISM_FORK_BLOCK_NUMBER))
  //     : 3960000n,
  //   url: process.env.VITE_OPTIMISM_FORK_URL ?? 'https://mainnet.base.org',
  // },
}

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [mock({ accounts })],
  pollingInterval: 100,
  storage: null,
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})

// Hacky way to mock a connected wallet
export const connectedConfig: Config = {
  ...config,
  state: {
    chainId: 1,
    connections: new Map().set(config.connectors[0].uid, {
      accounts,
      chainId: 1,
      connector: config.connectors[0],
    }),
    current: config.connectors[0].uid,
    status: 'connected',
  },
}
