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

`(variables: WriteWithdrawETHParameters) => void`

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

### writeWithdrawETHAsync

`(variables: WriteWithdrawETHParameters) => Promise<WriteContractReturnType>`

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

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
