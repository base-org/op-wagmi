## Configuration

OP Wagmi currently ships with support for Base, Base Goerli, Optimism, Optimism Goerli, Zora, and Zora Goerli. If you'd like to interact with other OP Stack chains, you can extend Wagmi's config to include a list of additional `l2Chains`. You'll also need to add the corresponding chain objects to your Wagmi config so OP Wagmi has access to RPC URLs etc.

::: code-group

```ts [l2Chains.ts]
export const customL2Chains = {
  1230123: {
    // Your L2 chain's ID
    chainId: 1230123,
    // The corresponding L1 chain ID
    l1ChainId: 1,
    // L1 OP Stack contract addresses for your chain
    l1Addresses: {
      portal: {
        address: '0x...',
        chainId: 1,
      },
      l2OutputOracle: {
        address: '0x...',
        chainId: 1,
      },
      l1StandardBridge: {
        address: '0x...',
        chainId: 1,
      },
      l1CrossDomainMessenger: {
        address: '0x...',
        chainId: 1,
      },
      l1Erc721Bridge: {
        address: '0x...',
        chainId: 1,
      },
    },
    // L2 OP Stack contract addresses for your chain
    l2Addresses: {
      l2L1MessagePasserAddress: {
        address: '0x4200000000000000000000000000000000000016',
        chainId: 1230123,
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010',
        chainId: 1230123,
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
const config = useConfig()

return (
  <button
    onClick={() =>
      writeDepositETH({
        args: {
          to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
          amount: 1n,
        },
        l2ChainId: 1230123,
        config: { ...config, l2Chains: customL2Chains },
      })}
  >
    Deposit ETH
  </button>
)
```

```ts [config.ts]
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { customChain } from './chains'

export const config = createConfig({
  chains: [mainnet, sepolia, customChain],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [customChain.id]: http(),
  },
})
```

:::
