# useSimulateProveWithdrawalTransaction

Simulates proving a withdrawal transaction.

```tsx [example.tsx]
import { useSimulateProveWithdrawalTransaction } from 'op-wagmi'

function App() {
  const result = useSimulateProveWithdrawalTransaction({
    args: {
      withdrawalTxHash:
        '0x18e70002441d72a82eebcf02786da417074c18cf54ca0eba49886773448151e8',
    },
    l2ChainId: 8453,
  })
}
```

## Parameters

### args

- #### withdrawalTxHash
  `Hash`

  The L2 transaction hash of the withdrawal initiation.

### l2ChainId

`number`

The chain ID of the chain you want to withdraw from.

## Return Value

Returns wagmi's [useSimulateContract return type](https://beta.wagmi.sh/react/api/hooks/useSimulateContract#return-type).
