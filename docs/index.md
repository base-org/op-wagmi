# Getting Started

## Overview

op-wagmi is a library of [Wagmi](https://beta.wagmi.sh/) v2-style hooks for interacting with [OP Stack](https://stack.optimism.io/) L2 chains such as [Optimism](https://community.optimism.io/docs/useful-tools/networks/) and [Base](https://docs.base.org/).

::: warning
op-wagmi is currently in alpha. The docs are not complete. The code is tested but is not yet recommended for production use.
:::

## Features

- Simplifies cross L1 & L2 interactions
- TypeScript ready
- Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network

## Installation

::: code-group

```bash [npm]
npm i op-wagmi
```

```bash [pnpm]
pnpm i op-wagmi
```

```bash [bun]
bun i op-wagmi
```

:::

## Example

After configuring your app to use Wagmi, simply import op-wagmi hooks to start interacting with OP Stack chains.

```tsx
import { useWriteDepositETH } from 'op-wagmi'

const { writeDepositETH } = useWriteDepositETH()

return (
  <button
    onClick={() =>
      writeDepositETH({
        args: {
          to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
          amount: 1n,
        },
        l2ChainId: 8453,
      })}
  >
    Deposit ETH
  </button>
)
```

Check out the [example Superchain Bridge](https://github.com/base-org/op-wagmi/tree/master/example) for more.
