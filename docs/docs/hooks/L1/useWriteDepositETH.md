# useWriteDepositETH

Action for executing a deposit of ETH to L2.

```tsx [example.tsx]
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

## Parameters

### Config

`Config | undefined`

Config to use instead of retrieving from the from nearest WagmiProvider.

## Return Value

### writeDepositETH

`(variables: WriteDepositETHParameters, { onSuccess, onSettled, onError }) => void`

The mutation function you can call with variables to trigger the ETH deposit.

- #### variables
  - ##### args

    - ###### to
    `Address`

    The address to deposit the ETH to.

    - ###### amount
    `bigint`

    The amount of ETH to deposit.

    - ###### gasLimit (optional)
    `number`

    The minimum gas limit to use for the deposit transaction.

    - ###### data (optional)
    `Hex`

    Data to include in the transaction.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you want to deposit to.

- #### options (optional)
  - ##### onSuccess
    `(data: WriteContractReturnType, variables: WriteDepositETHParameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteDepositETHParameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteDepositETHParameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### writeDepositETHAsync

`(variables: WriteDepositETHParameters, { onSuccess, onSettled, onError }) => Promise<WriteContractReturnType>`

Similar to writeDepositETH but returns a promise which can be awaited.

- #### variables
  - ##### args

    - ###### to
    `Address`

    The address to deposit the ETH to.

    - ###### amount
    `bigint`

    The amount of ETH to deposit.

    - ###### gasLimit (optional)
    `number`

    The minimum gas limit to use for the deposit transaction.

    - ###### data (optional)
    `Hex`

    Data to include in the transaction.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you want to deposit to.

- #### options (optional)
  - ##### onSuccess
    `(data: WriteContractReturnType, variables: WriteDepositETHParameters, context: TContext) => void`

    This function will fire when the mutation is successful and will be passed the mutation's result.

  - ##### onError
    `(error: WriteContractErrorType, variables: WriteDepositETHParameters, context: TContext | undefined) => void`

    This function will fire if the mutation encounters an error and will be passed the error.

  - ##### onSettled
    `(data: WriteContractReturnType | undefined, error: WriteContractErrorType | null, variables: WriteDepositETHParameters, context: TContext | undefined) => void`

    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - If you make multiple requests, onSuccess will fire only after the latest call you've made.

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
