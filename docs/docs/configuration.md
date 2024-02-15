## Configuration

OP Wagmi currently ships with support for Base, Base Goerli, Optimism, Optimism Goerli, Zora, and Zora Goerli. If you'd like to interact with other OP Stack chains, you can extend Wagmi's config to include a list of additional `l2Chains`. You'll also need to add the corresponding chain objects to your Wagmi config so OP Wagmi has access to RPC URLs etc.

::: code-group

```ts [l2Chains.ts]
import { type Chain, mainnet } from 'viem/chains'

export const exampleChain: Chain = {
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    l2OutputOracle: {
      [mainnet.id]: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
    l1StandardBridge: {
      [mainnet.id]: {
        address: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e',
        blockCreated: 17482143,
      },
    },
    portal: {
      [mainnet.id]: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
    },
  },
}
```

```tsx [app.tsx]
import { useWriteDepositETH } from 'op-wagmi'
import { useConfig } from 'wagmi'
import { customL2Chains } from './l2Chains'

const { writeDepositETH } = useWriteDepositETH()

return (
  <button
    onClick={() => (writeDepositETH({
      args: {
        to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
        amount: 1n,
      },
      l2ChainId: 1230123,
    }))}
  >
    Deposit ETH
  </button>
)
```

```ts [config.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { exampleChain } from './chains'

export const config = createConfig({
  chains: [mainnet, sepolia, exampleChain],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [exampleChain.id]: http(),
  },
})
```

:::
