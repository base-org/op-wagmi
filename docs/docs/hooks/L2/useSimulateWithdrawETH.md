# useSimulateWithdrawETH

Simulates initiating a withdrawal of ETH to L1.

```tsx [example.tsx]
import { useSimulateWithdrawETH } from 'op-wagmi'

function App() {
  const result = useSimulateWithdrawETH({
    args: {
      to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
      amount: 1n,
    },
    chainId: 8453,
  })
}
```

## Parameters

### args

- #### to
  `Address`

  The address to withdraw the ETH to.

- #### amount
  `bigint`

  The amount of ETH to withdraw.

- #### minGasLimit (optional)
  `number`

  Minimum gas limit to use for the transaction.

- #### extraData (optional)
  `Hex`

  Extra data to include in the transaction.

### chainId

`number`

The chain ID of the chain you want to withdraw from.

## Return Value

Returns wagmi's [useSimulateContract return type](https://beta.wagmi.sh/react/api/hooks/useSimulateContract#return-type).
