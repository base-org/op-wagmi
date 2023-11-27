# useWriteProveWithdrawalTransaction

Action for proving a withdrawal transaction.

```tsx [example.tsx]
import { useWriteProveWithdrawalTransaction } from 'op-wagmi'

const { writeProveWithdrawalTransaction } = useWriteProveWithdrawalTransaction()

return (
  <button
    onClick={() =>
      writeProveWithdrawalTransaction({
        args: {
          withdrawalTxHash:
            '0x18e70002441d72a82eebcf02786da417074c18cf54ca0eba49886773448151e8',
        },
        l2ChainId: 8453,
      })}
  >
    Prove Withdrawal
  </button>
)
```

## Parameters

### Config

`Config | undefined`

Config to use instead of retrieving from the from nearest WagmiProvider.

## Return Value

### writeProveWithdrawalTransaction

`(variables: WriteProveWithdrawalTransactionParameters) => void`

The mutation function you can call with variables to trigger proving the provided withdrawal.

- #### variables
  - ##### args

    - ###### withdrawalTxHash
    `Hash`

    The L2 transaction hash of the withdrawal initiation.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you are withdrawing from.

### writeProveWithdrawalTransactionAsync

`(variables: WriteProveWithdrawalTransactionParameters) => Promise<WriteContractReturnType>`

Similar to writeProveWithdrawalTransaction but returns a promise which can be awaited.

- #### variables
  - ##### args

    - ###### withdrawalTxHash
    `Hash`

    The L2 transaction hash of the withdrawal initiation.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you are withdrawing from.

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
