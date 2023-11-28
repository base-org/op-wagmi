# useWriteWithdrawERC20

Action for initiating a withdrawal of an ERC20 to L1.

```tsx [example.tsx]
import { useWriteWithdrawERC20 } from 'op-wagmi'

const { writeWithdrawERC20 } = useWriteWithdrawERC20()

return (
  <button
    onClick={() =>
      writeWithdrawERC20({
        args: {
          l2Token: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
          to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
          amount: 1n,
        },
        chainId: 8453,
      })}
  >
    Withdraw ERC20
  </button>
)
```

## Parameters

### Config

`Config | undefined`

Config to use instead of retrieving from the from nearest WagmiProvider.

## Return Value

### writeWithdrawERC20

`(variables: WriteWithdrawERC20Parameters, { onSuccess, onSettled, onError }) => void`

The mutation function you can call with variables to trigger initiating the ERC20 withdrawal.

- #### variables
  - ##### args

    - ###### l2Token
    `Address`

    The contract address of the token on L2.

    - ###### to
    `Address`

    The address to withdraw the tokens to.

    - ###### amount
    `bigint`

    The amount to withdraw.

    - ###### minGasLimit (optional)
    `number`

    Minimum gas limit to use for the transaction.

    - ###### extraData (optional)
    `Hex`

    Extra data to include in the transaction.

  - ##### chainId
    `number`

    The chain ID of the chain you want to withdraw from.

- #### options (optional)
  - ##### onSuccess
    `(data: WriteContractReturnType, variables: WriteWithdrawERC20Parameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteWithdrawERC20Parameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteWithdrawERC20Parameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### writeWithdrawERC20Async

`(variables: WriteWithdrawERC20Parameters, { onSuccess, onSettled, onError }) => Promise<WriteContractReturnType>`

Similar to writeWithdrawERC20 but returns a promise which can be awaited.

- #### variables
  - ##### args

    - ###### l2Token
    `Address`

    The contract address of the token on L2.

    - ###### to
    `Address`

    The address to withdraw the tokens to.

    - ###### amount
    `bigint`

    The amount to withdraw.

    - ###### minGasLimit (optional)
    `number`

    Minimum gas limit to use for the transaction.

    - ###### extraData (optional)
    `Hex`

    Extra data to include in the transaction.

  - ##### chainId
    `number`

    The chain ID of the chain you want to withdraw from.

- #### options (optional)
  - ##### onSuccess
    `(data: WriteContractReturnType, variables: WriteWithdrawERC20Parameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteWithdrawERC20Parameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteWithdrawERC20Parameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
