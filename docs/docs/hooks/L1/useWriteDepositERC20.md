# useWriteDepositERC20

Action for executing a deposit of an ERC20 to L2.

```tsx [example.tsx]
import { useWriteDepositERC20 } from 'op-wagmi'

const { writeDepositERC20 } = useWriteDepositERC20()

return (
  <button
    onClick={() =>
      writeDepositERC20({
        args: {
          l1Token: '0xbe9895146f7af43049ca1c1ae358b0541ea49704',
          l2Token: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
          to: '0x968Bb4fF2482ff56Af1255019d5b955510A1159e',
          amount: 1n,
        },
        l2ChainId: 8453,
      })}
  >
    Deposit ERC20
  </button>
)
```

## Parameters

### Config

`Config | undefined`

Config to use instead of retrieving from the from nearest WagmiProvider.

## Return Value

### writeDepositERC20

`(variables: WriteDepositERC20Parameters) => void`

The mutation function you can call with variables to trigger the deposit.

- #### variables
  - ##### args

    - ###### l1Token
    `Address`

    The contract address of the token on L1.

    - ###### l2Token
    `Address`

    The contract address of the token on L2.

    - ###### to
    `Address`

    The address to deposit the tokens to.

    - ###### amount
    `bigint`

    The amount to deposit.

    - ###### minGasLimit (optional)
    `number`

    The minimum gas limit to use for the deposit transaction.

    - ###### extraData (optional)
    `Hex`

    Extra data to include in the transaction.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you want to deposit to.

### writeDepositERC20Async

`(variables: WriteDepositERC20Parameters) => Promise<WriteContractReturnType>`

Similar to writeDepositERC20 but returns a promise which can be awaited.

- #### variables
  - ##### args

    - ###### l1Token
    `Address`

    The contract address of the token on L1.

    - ###### l2Token
    `Address`

    The contract address of the token on L2.

    - ###### to
    `Address`

    The address to deposit the tokens to.

    - ###### amount
    `bigint`

    The amount to deposit.

    - ###### minGasLimit (optional)
    `number`

    The minimum gas limit to use for the deposit transaction.

    - ###### extraData (optional)
    `Hex`

    Extra data to include in the transaction.

  - ##### l2ChainId
    `number`

    The chain ID of the chain you want to deposit to.

### The rest of wagmi's [useWriteContract return type](https://beta.wagmi.sh/react/api/hooks/useWrtieContract#return-type) (except `writeContract` and `writeContractAsync`).
