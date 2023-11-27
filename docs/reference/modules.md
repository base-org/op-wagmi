[op-wagmi](/reference/README.md) / Exports

# op-wagmi

## Table of contents

### Type Aliases

- [UseSimulateDepositERC20Parameters](/reference/modules.md#usesimulatedepositerc20parameters)
- [UseSimulateDepositETHParameters](/reference/modules.md#usesimulatedepositethparameters)
- [UseSimulateFinalizeWithdrawalTransactionParameters](/reference/modules.md#usesimulatefinalizewithdrawaltransactionparameters)
- [UseSimulateProveWithdrawalTransactionParameters](/reference/modules.md#usesimulateprovewithdrawaltransactionparameters)
- [UseSimulateWithdrawERC20Parameters](/reference/modules.md#usesimulatewithdrawerc20parameters)
- [UseSimulateWithdrawETHParameters](/reference/modules.md#usesimulatewithdrawethparameters)
- [UseWriteDepositERC20Parameters](/reference/modules.md#usewritedepositerc20parameters)
- [UseWriteDepositETHParameters](/reference/modules.md#usewritedepositethparameters)
- [UseWriteFinalizeWithdrawalTransactionParameters](/reference/modules.md#usewritefinalizewithdrawaltransactionparameters)
- [UseWriteProveWithdrawalTransactionParameters](/reference/modules.md#usewriteprovewithdrawaltransactionparameters)
- [UseWriteWithdrawERC20Parameters](/reference/modules.md#usewritewithdrawerc20parameters)
- [UseWriteWithdrawETHParameters](/reference/modules.md#usewritewithdrawethparameters)
- [WriteDepositERC20Parameters](/reference/modules.md#writedepositerc20parameters)
- [WriteDepositETHParameters](/reference/modules.md#writedepositethparameters)
- [WriteFinalizeWithdrawalTransactionParameters](/reference/modules.md#writefinalizewithdrawaltransactionparameters)
- [WriteProveWithdrawalTransactionParameters](/reference/modules.md#writeprovewithdrawaltransactionparameters)
- [WriteWithdrawERC20Parameters](/reference/modules.md#writewithdrawerc20parameters)
- [WriteWithdrawETHParameters](/reference/modules.md#writewithdrawethparameters)

### Functions

- [useSimulateDepositERC20](/reference/modules.md#usesimulatedepositerc20)
- [useSimulateDepositETH](/reference/modules.md#usesimulatedepositeth)
- [useSimulateFinalizeWithdrawalTransaction](/reference/modules.md#usesimulatefinalizewithdrawaltransaction)
- [useSimulateProveWithdrawalTransaction](/reference/modules.md#usesimulateprovewithdrawaltransaction)
- [useSimulateWithdrawERC20](/reference/modules.md#usesimulatewithdrawerc20)
- [useSimulateWithdrawETH](/reference/modules.md#usesimulatewithdraweth)
- [useWriteDepositERC20](/reference/modules.md#usewritedepositerc20)
- [useWriteDepositETH](/reference/modules.md#usewritedepositeth)
- [useWriteFinalizeWithdrawalTransaction](/reference/modules.md#usewritefinalizewithdrawaltransaction)
- [useWriteProveWithdrawalTransaction](/reference/modules.md#usewriteprovewithdrawaltransaction)
- [useWriteWithdrawERC20](/reference/modules.md#usewritewithdrawerc20)
- [useWriteWithdrawETH](/reference/modules.md#usewritewithdraweth)

## Type Aliases

### UseSimulateDepositERC20Parameters

Ƭ **UseSimulateDepositERC20Parameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`SimulateDepositERC20Parameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositERC20.ts:14](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateDepositERC20.ts#L14)

---

### UseSimulateDepositETHParameters

Ƭ **UseSimulateDepositETHParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`SimulateDepositETHParameters`, `"args"`\>[`"args"`], `"gasLimit"`\> & \{ `gasLimit?`: `number` } } & \{ `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositETH.ts:14](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateDepositETH.ts#L14)

---

### UseSimulateFinalizeWithdrawalTransactionParameters

Ƭ **UseSimulateFinalizeWithdrawalTransactionParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: \{ `withdrawalTxHash`: `Hash` } ; `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateFinalizeWithdrawalTransaction.ts:17](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateFinalizeWithdrawalTransaction.ts#L17)

---

### UseSimulateProveWithdrawalTransactionParameters

Ƭ **UseSimulateProveWithdrawalTransactionParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: \{ `withdrawalTxHash`: `Hash` } ; `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateProveWithdrawalTransaction.ts:23](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateProveWithdrawalTransaction.ts#L23)

---

### UseSimulateWithdrawERC20Parameters

Ƭ **UseSimulateWithdrawERC20Parameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`SimulateWithdrawERC20Parameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `chainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawERC20.ts:15](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useSimulateWithdrawERC20.ts#L15)

---

### UseSimulateWithdrawETHParameters

Ƭ **UseSimulateWithdrawETHParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`SimulateWithdrawETHParameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `chainId`: `number` }

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                                               |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawETH.ts:16](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useSimulateWithdrawETH.ts#L16)

---

### UseWriteDepositERC20Parameters

Ƭ **UseWriteDepositERC20Parameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:23](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositERC20.ts#L23)

---

### UseWriteDepositETHParameters

Ƭ **UseWriteDepositETHParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L1/useWriteDepositETH.ts:27](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositETH.ts#L27)

---

### UseWriteFinalizeWithdrawalTransactionParameters

Ƭ **UseWriteFinalizeWithdrawalTransactionParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L1/useWriteFinalizeWithdrawalTransaction.ts:30](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteFinalizeWithdrawalTransaction.ts#L30)

---

### UseWriteProveWithdrawalTransactionParameters

Ƭ **UseWriteProveWithdrawalTransactionParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L1/useWriteProveWithdrawalTransaction.ts:33](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteProveWithdrawalTransaction.ts#L33)

---

### UseWriteWithdrawERC20Parameters

Ƭ **UseWriteWithdrawERC20Parameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:23](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawERC20.ts#L23)

---

### UseWriteWithdrawETHParameters

Ƭ **UseWriteWithdrawETHParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<`config`, `context`\>

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:24](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawETH.ts#L24)

---

### WriteDepositERC20Parameters

Ƭ **WriteDepositERC20Parameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`WriteDepositERC20ActionParameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:14](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositERC20.ts#L14)

---

### WriteDepositETHParameters

Ƭ **WriteDepositETHParameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`WriteDepositETHActionParameters`, `"args"`\>[`"args"`], `"gasLimit"`\> & \{ `gasLimit?`: `number` } } & \{ `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L1/useWriteDepositETH.ts:18](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositETH.ts#L18)

---

### WriteFinalizeWithdrawalTransactionParameters

Ƭ **WriteFinalizeWithdrawalTransactionParameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: \{ `withdrawalTxHash`: `Hash` } ; `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L1/useWriteFinalizeWithdrawalTransaction.ts:20](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteFinalizeWithdrawalTransaction.ts#L20)

---

### WriteProveWithdrawalTransactionParameters

Ƭ **WriteProveWithdrawalTransactionParameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: \{ `withdrawalTxHash`: `Hash` } ; `l2ChainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L1/useWriteProveWithdrawalTransaction.ts:23](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteProveWithdrawalTransaction.ts#L23)

---

### WriteWithdrawERC20Parameters

Ƭ **WriteWithdrawERC20Parameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`WriteWithdrawERC20ActionParameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `chainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:14](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawERC20.ts#L14)

---

### WriteWithdrawETHParameters

Ƭ **WriteWithdrawETHParameters**\<`config`, `chainId`\>: `WriteOPContractBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & \{ `args`: `Omit`\<`Pick`\<`WriteWithdrawETHActionParameters`, `"args"`\>[`"args"`], `"minGasLimit"`\> & \{ `minGasLimit?`: `number` } } & \{ `chainId`: `number` }

#### Type parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                             |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] = `number` |

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:15](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawETH.ts#L15)

## Functions

### useSimulateDepositERC20

▸ **useSimulateDepositERC20**\<`config`, `chainId`\>(`parameters`): `UseSimulateDepositERC20ReturnType`\<`config`, `chainId`\>

Simulates a deposit of ERC20 tokens to L2

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                  | Description                                                                                  |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateDepositERC20Parameters`](/reference/modules.md#usesimulatedepositerc20parameters)\<`config`, `chainId`\> | [UseSimulateDepositERC20Parameters](/reference/modules.md#usesimulatedepositerc20parameters) |

#### Returns

`UseSimulateDepositERC20ReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateDepositERC20ReturnType

#### Defined in

[hooks/L1/useSimulateDepositERC20.ts:33](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateDepositERC20.ts#L33)

---

### useSimulateDepositETH

▸ **useSimulateDepositETH**\<`config`, `chainId`\>(`parameters`): `UseSimulateDepositETHReturnType`\<`config`, `chainId`\>

Simulates a deposit of ETH to L2

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                              | Description                                                                              |
| :----------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateDepositETHParameters`](/reference/modules.md#usesimulatedepositethparameters)\<`config`, `chainId`\> | [UseSimulateDepositETHParameters](/reference/modules.md#usesimulatedepositethparameters) |

#### Returns

`UseSimulateDepositETHReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateDepositETHReturnType

#### Defined in

[hooks/L1/useSimulateDepositETH.ts:33](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateDepositETH.ts#L33)

---

### useSimulateFinalizeWithdrawalTransaction

▸ **useSimulateFinalizeWithdrawalTransaction**\<`config`, `chainId`\>(`parameters`): `UseSimulateFinalizeWithdrawalTransactionReturnType`\<`config`, `chainId`\>

Simulates finalizing a withdrawal transaction.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                                                    | Description                                                                                                                    |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateFinalizeWithdrawalTransactionParameters`](/reference/modules.md#usesimulatefinalizewithdrawaltransactionparameters)\<`config`, `chainId`\> | [UseSimulateFinalizeWithdrawalTransactionParameters](/reference/modules.md#usesimulatefinalizewithdrawaltransactionparameters) |

#### Returns

`UseSimulateFinalizeWithdrawalTransactionReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateFinalizeWithdrawalTransactionReturnType

#### Defined in

[hooks/L1/useSimulateFinalizeWithdrawalTransaction.ts:39](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateFinalizeWithdrawalTransaction.ts#L39)

---

### useSimulateProveWithdrawalTransaction

▸ **useSimulateProveWithdrawalTransaction**\<`config`, `chainId`\>(`parameters`): `UseSimulateProveWithdrawalTransactionReturnType`\<`config`, `chainId`\>

Simulates proving a withdrawal transaction.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                                              | Description                                                                                                              |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateProveWithdrawalTransactionParameters`](/reference/modules.md#usesimulateprovewithdrawaltransactionparameters)\<`config`, `chainId`\> | [UseSimulateProveWithdrawalTransactionParameters](/reference/modules.md#usesimulateprovewithdrawaltransactionparameters) |

#### Returns

`UseSimulateProveWithdrawalTransactionReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateProveWithdrawalTransactionReturnType

#### Defined in

[hooks/L1/useSimulateProveWithdrawalTransaction.ts:45](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useSimulateProveWithdrawalTransaction.ts#L45)

---

### useSimulateWithdrawERC20

▸ **useSimulateWithdrawERC20**\<`config`, `chainId`\>(`parameters`): `UseSimulateWithdrawERC20ReturnType`\<`config`, `chainId`\>

Simulates a withdrawal of ERC20 tokens to an L1 address.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                    | Description                                                                                    |
| :----------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateWithdrawERC20Parameters`](/reference/modules.md#usesimulatewithdrawerc20parameters)\<`config`, `chainId`\> | [UseSimulateWithdrawERC20Parameters](/reference/modules.md#usesimulatewithdrawerc20parameters) |

#### Returns

`UseSimulateWithdrawERC20ReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateWithdrawERC20ReturnType

#### Defined in

[hooks/L2/useSimulateWithdrawERC20.ts:34](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useSimulateWithdrawERC20.ts#L34)

---

### useSimulateWithdrawETH

▸ **useSimulateWithdrawETH**\<`config`, `chainId`\>(`parameters`): `UseSimulateWithdrawETHReturnType`\<`config`, `chainId`\>

Simulates a withdrawal of ETH to an L1 address.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `OpConfig`                 |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                | Description                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateWithdrawETHParameters`](/reference/modules.md#usesimulatewithdrawethparameters)\<`config`, `chainId`\> | [UseSimulateWithdrawETHParameters](/reference/modules.md#usesimulatewithdrawethparameters) |

#### Returns

`UseSimulateWithdrawETHReturnType`\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). UseSimulateWithdrawETHReturnType

#### Defined in

[hooks/L2/useSimulateWithdrawETH.ts:35](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useSimulateWithdrawETH.ts#L35)

---

### useWriteDepositERC20

▸ **useWriteDepositERC20**\<`config`, `context`\>(`args?`): `UseWriteDepositERC20ReturnType`\<`config`, `context`\>

Deposits ERC20 tokens to L2 using the standard bridge

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                            |
| :----- | :-------------------------------------------------------------------------------------------------------------- |
| `args` | [`UseWriteDepositERC20Parameters`](/reference/modules.md#usewritedepositerc20parameters)\<`config`, `context`\> |

#### Returns

`UseWriteDepositERC20ReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteDepositERC20ReturnType

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:42](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositERC20.ts#L42)

---

### useWriteDepositETH

▸ **useWriteDepositETH**\<`config`, `context`\>(`args?`): `UseWriteDepositETHReturnType`\<`config`, `context`\>

Deposits ETH to L2 using the OptimismPortal contract

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                        |
| :----- | :---------------------------------------------------------------------------------------------------------- |
| `args` | [`UseWriteDepositETHParameters`](/reference/modules.md#usewritedepositethparameters)\<`config`, `context`\> |

#### Returns

`UseWriteDepositETHReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteDepositETHReturnType

#### Defined in

[hooks/L1/useWriteDepositETH.ts:83](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteDepositETH.ts#L83)

---

### useWriteFinalizeWithdrawalTransaction

▸ **useWriteFinalizeWithdrawalTransaction**\<`config`, `context`\>(`args?`): `UseWriteFinalizeWithdrawalTransactionReturnType`\<`config`, `context`\>

Deposits ETH to L2 using the OptimismPortal contract

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `args` | [`UseWriteFinalizeWithdrawalTransactionParameters`](/reference/modules.md#usewritefinalizewithdrawaltransactionparameters)\<`config`, `context`\> |

#### Returns

`UseWriteFinalizeWithdrawalTransactionReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteFinalizeWithdrawalTransactionReturnType

#### Defined in

[hooks/L1/useWriteFinalizeWithdrawalTransaction.ts:87](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteFinalizeWithdrawalTransaction.ts#L87)

---

### useWriteProveWithdrawalTransaction

▸ **useWriteProveWithdrawalTransaction**\<`config`, `context`\>(`args?`): `UseWriteProveWithdrawalTransactionReturnType`\<`config`, `context`\>

Deposits ETH to L2 using the OptimismPortal contract

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                                                        |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `args` | [`UseWriteProveWithdrawalTransactionParameters`](/reference/modules.md#usewriteprovewithdrawaltransactionparameters)\<`config`, `context`\> |

#### Returns

`UseWriteProveWithdrawalTransactionReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteProveWithdrawalTransactionReturnType

#### Defined in

[hooks/L1/useWriteProveWithdrawalTransaction.ts:104](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L1/useWriteProveWithdrawalTransaction.ts#L104)

---

### useWriteWithdrawERC20

▸ **useWriteWithdrawERC20**\<`config`, `context`\>(`args?`): `UseWriteWithdrawERC20ReturnType`\<`config`, `context`\>

Withdraws ERC20 tokens to an L1 address.

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                              |
| :----- | :---------------------------------------------------------------------------------------------------------------- |
| `args` | [`UseWriteWithdrawERC20Parameters`](/reference/modules.md#usewritewithdrawerc20parameters)\<`config`, `context`\> |

#### Returns

`UseWriteWithdrawERC20ReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteWithdrawERC20ReturnType

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:42](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawERC20.ts#L42)

---

### useWriteWithdrawETH

▸ **useWriteWithdrawETH**\<`config`, `context`\>(`args?`): `UseWriteWithdrawETHReturnType`\<`config`, `context`\>

Withdraws ETH to an L1 address.

#### Type parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `config`  | extends `Config` = `OpConfig` |
| `context` | `unknown`                     |

#### Parameters

| Name   | Type                                                                                                          |
| :----- | :------------------------------------------------------------------------------------------------------------ |
| `args` | [`UseWriteWithdrawETHParameters`](/reference/modules.md#usewritewithdrawethparameters)\<`config`, `context`\> |

#### Returns

`UseWriteWithdrawETHReturnType`\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). UseWriteWithdrawETHReturnType

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:43](https://github.com/base-org/op-wagmi/blob/master/src/hooks/L2/useWriteWithdrawETH.ts#L43)
