# useSimulateDepositETH

Simulates a deposit of ETH to L2.

```tsx [example.tsx]
import { useSimulateDepositETH } from 'op-wagmi'

function App() {
  const result = useSimulateDepositETH({
    args: {
      to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
      amount: 1n,
    },
    l2ChainId: 8453,
  })
}
```

## Parameters

### args

- #### to
  `Address`

  The address to deposit the ETH to.

- #### amount
  `bigint`

  The amount of ETH to deposit.

- #### gasLimit (optional)
  `number`

  The minimum gas limit to use for the deposit transaction.

- #### data (optional)
  `Hex`

  Data to include in the transaction.

### l2ChainId

`number`

The chain ID of the chain you want to deposit to.

## Return Value

Returns wagmi's [useSimulateContract return type](https://beta.wagmi.sh/react/api/hooks/useSimulateContract#return-type).
