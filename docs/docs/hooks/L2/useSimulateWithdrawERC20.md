# useSimulateWithdrawERC20

Simulates initiating a withdrawal of an ERC20 to L1.

```tsx [example.tsx]
import { useSimulateWithdrawERC20 } from 'op-wagmi'

function App() {
  const result = useSimulateWithdrawERC20({
    args: {
      l2Token: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
      to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
      amount: 1n,
    },
    chainId: 8453,
  })
}
```

## Parameters

### args

- #### l2Token
  `Address`

  The contract address of the token on L2.

- #### to
  `Address`

  The address to withdraw the tokens to.

- #### amount
  `bigint`

  The amount to withdraw.

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
