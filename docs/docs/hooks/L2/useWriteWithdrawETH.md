# useWriteWithdrawETH

Action for initiating a withdrawal of ETH to L1.

```tsx [example.tsx]
import { useWriteWithdrawETH } from 'op-wagmi'

const { writeWithdrawETH } = useWriteWithdrawETH()

return (
  <button
    onClick={() =>
      writeWithdrawETH({
        args: {
          to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
          amount: 1n,
        },
        chainId: 8453,
      })}
  >
    Withdraw ETH
  </button>
)
```

## Parameters

### Config

`Config | undefined`

Config to use instead of retrieving from the from nearest WagmiProvider.

## Return Value

### writeWithdrawETH

`(variables: WriteWithdrawETHParameters, { onSuccess, onSettled, onError }) => void`

The mutation function you can call with variables to trigger initiating the ETH withdrawal.

- #### variables
  - ##### args

    - ###### to
    `Address`

    The address to withdraw the ETH to.

    - ###### amount
    `bigint`

    The amount of ETH to withdraw.

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
    `(data: WriteContractReturnType, variables: WriteWithdrawETHParameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteWithdrawETHParameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteWithdrawETHParameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### writeWithdrawETHAsync

`(variables: WriteWithdrawETHParameters, { onSuccess, onSettled, onError }) => Promise<WriteContractReturnType>`

Similar to writeWithdrawETH but returns a promise which can be awaited.

- #### variables
  - ##### args

    - ###### to
    `Address`

    The address to withdraw the ETH to.

    - ###### amount
    `bigint`

    The amount of ETH to withdraw.

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
    `(data: WriteContractReturnType, variables: WriteWithdrawETHParameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteWithdrawETHParameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteWithdrawETHParameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
