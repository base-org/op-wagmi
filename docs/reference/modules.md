[op-wagmi](/reference/README.md) / Exports

# op-wagmi

## Table of contents

### Type Aliases

- [UseSimulateDepositERC20Parameters](/reference/modules.md#usesimulatedepositerc20parameters)
- [UseSimulateDepositERC20ReturnType](/reference/modules.md#usesimulatedepositerc20returntype)
- [UseSimulateDepositETHParameters](/reference/modules.md#usesimulatedepositethparameters)
- [UseSimulateDepositETHReturnType](/reference/modules.md#usesimulatedepositethreturntype)
- [UseSimulateWithdrawERC20Parameters](/reference/modules.md#usesimulatewithdrawerc20parameters)
- [UseSimulateWithdrawERC20ReturnType](/reference/modules.md#usesimulatewithdrawerc20returntype)
- [UseSimulateWithdrawETHParameters](/reference/modules.md#usesimulatewithdrawethparameters)
- [UseSimulateWithdrawETHReturnType](/reference/modules.md#usesimulatewithdrawethreturntype)
- [UseWriteDepositERC20Parameters](/reference/modules.md#usewritedepositerc20parameters)
- [UseWriteDepositERC20ReturnType](/reference/modules.md#usewritedepositerc20returntype)
- [UseWriteDepositETHParameters](/reference/modules.md#usewritedepositethparameters)
- [UseWriteDepositETHReturnType](/reference/modules.md#usewritedepositethreturntype)
- [UseWriteWithdrawERC20Parameters](/reference/modules.md#usewritewithdrawerc20parameters)
- [UseWriteWithdrawERC20ReturnType](/reference/modules.md#usewritewithdrawerc20returntype)
- [UseWriteWithdrawETHParameters](/reference/modules.md#usewritewithdrawethparameters)
- [UseWriteWithdrawETHReturnType](/reference/modules.md#usewritewithdrawethreturntype)
- [WriteDepositERC20Parameters](/reference/modules.md#writedepositerc20parameters)
- [WriteDepositETHParameters](/reference/modules.md#writedepositethparameters)
- [WriteWithdrawERC20Parameters](/reference/modules.md#writewithdrawerc20parameters)
- [WriteWithdrawETHParameters](/reference/modules.md#writewithdrawethparameters)

### Functions

- [useSimulateDepositERC20](/reference/modules.md#usesimulatedepositerc20)
- [useSimulateDepositETH](/reference/modules.md#usesimulatedepositeth)
- [useSimulateWithdrawERC20](/reference/modules.md#usesimulatewithdrawerc20)
- [useSimulateWithdrawETH](/reference/modules.md#usesimulatewithdraweth)
- [useWriteDepositERC20](/reference/modules.md#usewritedepositerc20)
- [useWriteDepositETH](/reference/modules.md#usewritedepositeth)
- [useWriteWithdrawERC20](/reference/modules.md#usewritewithdrawerc20)
- [useWriteWithdrawETH](/reference/modules.md#usewritewithdraweth)

## Type Aliases

### UseSimulateDepositERC20Parameters

Ƭ **UseSimulateDepositERC20Parameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & `SimulateDepositERC20Parameters`

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositERC20.ts:15](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositERC20.ts#L15)

---

### UseSimulateDepositERC20ReturnType

Ƭ **UseSimulateDepositERC20ReturnType**\<`config`, `chainId`\>: `UseSimulateOPActionBaseReturnType`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\>

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositERC20.ts:22](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositERC20.ts#L22)

---

### UseSimulateDepositETHParameters

Ƭ **UseSimulateDepositETHParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & `SimulateDepositETHParameters`

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositETH.ts:15](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositETH.ts#L15)

---

### UseSimulateDepositETHReturnType

Ƭ **UseSimulateDepositETHReturnType**\<`config`, `chainId`\>: `UseSimulateOPActionBaseReturnType`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\>

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L1/useSimulateDepositETH.ts:22](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositETH.ts#L22)

---

### UseSimulateWithdrawERC20Parameters

Ƭ **UseSimulateWithdrawERC20Parameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & `SimulateWithdrawERC20Parameters`

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawERC20.ts:15](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawERC20.ts#L15)

---

### UseSimulateWithdrawERC20ReturnType

Ƭ **UseSimulateWithdrawERC20ReturnType**\<`config`, `chainId`\>: `UseSimulateOPActionBaseReturnType`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\>

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawERC20.ts:22](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawERC20.ts#L22)

---

### UseSimulateWithdrawETHParameters

Ƭ **UseSimulateWithdrawETHParameters**\<`config`, `chainId`\>: `UseSimulateOPActionBaseParameters`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\> & `SimulateWithdrawETHParameters`

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawETH.ts:15](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawETH.ts#L15)

---

### UseSimulateWithdrawETHReturnType

Ƭ **UseSimulateWithdrawETHReturnType**\<`config`, `chainId`\>: `UseSimulateOPActionBaseReturnType`\<typeof `ABI`, typeof `FUNCTION`, `config`, `chainId`\>

#### Type parameters

| Name      | Type                                                                        |
| :-------- | :-------------------------------------------------------------------------- |
| `config`  | extends `Config` = `ResolvedRegister`[`"config"`]                           |
| `chainId` | extends `config`[`"chains"`][`number`][`"id"`] \| `undefined` = `undefined` |

#### Defined in

[hooks/L2/useSimulateWithdrawETH.ts:22](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawETH.ts#L22)

---

### UseWriteDepositERC20Parameters

Ƭ **UseWriteDepositERC20Parameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<[`WriteDepositERC20Parameters`](/reference/modules.md#writedepositerc20parameters), `config`, `context`\>

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:14](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositERC20.ts#L14)

---

### UseWriteDepositERC20ReturnType

Ƭ **UseWriteDepositERC20ReturnType**\<`config`, `context`\>: `Omit`\<`UseWriteOPActionBaseReturnType`\<[`WriteDepositERC20Parameters`](/reference/modules.md#writedepositerc20parameters), `config`, `context`\>, `"write"` \| `"writeAsync"`\> & \{ `writeDepositERC20`: `UseWriteOPActionBaseReturnType`\<[`WriteDepositERC20Parameters`](/reference/modules.md#writedepositerc20parameters), `config`, `context`\>[`"write"`] ; `writeDepositERC20Async`: `UseWriteOPActionBaseReturnType`\<[`WriteDepositERC20Parameters`](/reference/modules.md#writedepositerc20parameters), `config`, `context`\>[`"writeAsync"`] }

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:17](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositERC20.ts#L17)

---

### UseWriteDepositETHParameters

Ƭ **UseWriteDepositETHParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<[`WriteDepositETHParameters`](/reference/modules.md#writedepositethparameters), `config`, `context`\>

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L1/useWriteDepositETH.ts:14](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositETH.ts#L14)

---

### UseWriteDepositETHReturnType

Ƭ **UseWriteDepositETHReturnType**\<`config`, `context`\>: `Omit`\<`UseWriteOPActionBaseReturnType`\<[`WriteDepositETHParameters`](/reference/modules.md#writedepositethparameters), `config`, `context`\>, `"write"` \| `"writeAsync"`\> & \{ `writeDepositETH`: `UseWriteOPActionBaseReturnType`\<[`WriteDepositETHParameters`](/reference/modules.md#writedepositethparameters), `config`, `context`\>[`"write"`] ; `writeDepositETHAsync`: `UseWriteOPActionBaseReturnType`\<[`WriteDepositETHParameters`](/reference/modules.md#writedepositethparameters), `config`, `context`\>[`"writeAsync"`] }

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L1/useWriteDepositETH.ts:17](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositETH.ts#L17)

---

### UseWriteWithdrawERC20Parameters

Ƭ **UseWriteWithdrawERC20Parameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<[`WriteWithdrawERC20Parameters`](/reference/modules.md#writewithdrawerc20parameters), `config`, `context`\>

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:14](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawERC20.ts#L14)

---

### UseWriteWithdrawERC20ReturnType

Ƭ **UseWriteWithdrawERC20ReturnType**\<`config`, `context`\>: `Omit`\<`UseWriteOPActionBaseReturnType`\<[`WriteWithdrawERC20Parameters`](/reference/modules.md#writewithdrawerc20parameters), `config`, `context`\>, `"write"` \| `"writeAsync"`\> & \{ `writeWithdrawERC20`: `UseWriteOPActionBaseReturnType`\<[`WriteWithdrawERC20Parameters`](/reference/modules.md#writewithdrawerc20parameters), `config`, `context`\>[`"write"`] ; `writeWithdrawERC20Async`: `UseWriteOPActionBaseReturnType`\<[`WriteWithdrawERC20Parameters`](/reference/modules.md#writewithdrawerc20parameters), `config`, `context`\>[`"writeAsync"`] }

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:21](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawERC20.ts#L21)

---

### UseWriteWithdrawETHParameters

Ƭ **UseWriteWithdrawETHParameters**\<`config`, `context`\>: `UseWriteOPActionBaseParameters`\<[`WriteWithdrawETHParameters`](/reference/modules.md#writewithdrawethparameters), `config`, `context`\>

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:14](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawETH.ts#L14)

---

### UseWriteWithdrawETHReturnType

Ƭ **UseWriteWithdrawETHReturnType**\<`config`, `context`\>: `Omit`\<`UseWriteOPActionBaseReturnType`\<[`WriteWithdrawETHParameters`](/reference/modules.md#writewithdrawethparameters), `config`, `context`\>, `"write"` \| `"writeAsync"`\> & \{ `writeWithdrawETH`: `UseWriteOPActionBaseReturnType`\<[`WriteWithdrawETHParameters`](/reference/modules.md#writewithdrawethparameters), `config`, `context`\>[`"write"`] ; `writeWithdrawETHAsync`: `UseWriteOPActionBaseReturnType`\<[`WriteWithdrawETHParameters`](/reference/modules.md#writewithdrawethparameters), `config`, `context`\>[`"writeAsync"`] }

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:21](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawETH.ts#L21)

---

### WriteDepositERC20Parameters

Ƭ **WriteDepositERC20Parameters**: `Omit`\<`WriteDepositERC20ActionParameters`, `"account"`\> & \{ `chainId?`: `number` }

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:12](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositERC20.ts#L12)

---

### WriteDepositETHParameters

Ƭ **WriteDepositETHParameters**: `Omit`\<`WriteDepositETHActionParameters`, `"account"`\> & \{ `chainId?`: `number` }

#### Defined in

[hooks/L1/useWriteDepositETH.ts:12](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositETH.ts#L12)

---

### WriteWithdrawERC20Parameters

Ƭ **WriteWithdrawERC20Parameters**: `Omit`\<`WriteWithdrawERC20ActionParameters`, `"account"`\> & \{ `chainId?`: `number` }

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:12](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawERC20.ts#L12)

---

### WriteWithdrawETHParameters

Ƭ **WriteWithdrawETHParameters**: `Omit`\<`WriteWithdrawETHActionParameters`, `"account"`\> & \{ `chainId?`: `number` }

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:12](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawETH.ts#L12)

## Functions

### useSimulateDepositERC20

▸ **useSimulateDepositERC20**\<`config`, `chainId`\>(`parameters`): [`UseSimulateDepositERC20ReturnType`](/reference/modules.md#usesimulatedepositerc20returntype)\<`config`, `chainId`\>

Simulates a deposit of ERC20 tokens to L2

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `Config`                   |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                  | Description                                                                                  |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateDepositERC20Parameters`](/reference/modules.md#usesimulatedepositerc20parameters)\<`config`, `chainId`\> | [UseSimulateDepositERC20Parameters](/reference/modules.md#usesimulatedepositerc20parameters) |

#### Returns

[`UseSimulateDepositERC20ReturnType`](/reference/modules.md#usesimulatedepositerc20returntype)\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). [UseSimulateDepositERC20ReturnType](/reference/modules.md#usesimulatedepositerc20returntype)

#### Defined in

[hooks/L1/useSimulateDepositERC20.ts:32](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositERC20.ts#L32)

---

### useSimulateDepositETH

▸ **useSimulateDepositETH**\<`config`, `chainId`\>(`parameters`): [`UseSimulateDepositETHReturnType`](/reference/modules.md#usesimulatedepositethreturntype)\<`config`, `chainId`\>

Simulates a deposit of ETH to L2

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `Config`                   |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                              | Description                                                                              |
| :----------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateDepositETHParameters`](/reference/modules.md#usesimulatedepositethparameters)\<`config`, `chainId`\> | [UseSimulateDepositETHParameters](/reference/modules.md#usesimulatedepositethparameters) |

#### Returns

[`UseSimulateDepositETHReturnType`](/reference/modules.md#usesimulatedepositethreturntype)\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). [UseSimulateDepositETHReturnType](/reference/modules.md#usesimulatedepositethreturntype)

#### Defined in

[hooks/L1/useSimulateDepositETH.ts:32](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useSimulateDepositETH.ts#L32)

---

### useSimulateWithdrawERC20

▸ **useSimulateWithdrawERC20**\<`config`, `chainId`\>(`parameters`): [`UseSimulateWithdrawERC20ReturnType`](/reference/modules.md#usesimulatewithdrawerc20returntype)\<`config`, `chainId`\>

Simulates a withdrawal of ERC20 tokens to an L1 address.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `Config`                   |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                    | Description                                                                                    |
| :----------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateWithdrawERC20Parameters`](/reference/modules.md#usesimulatewithdrawerc20parameters)\<`config`, `chainId`\> | [UseSimulateWithdrawERC20Parameters](/reference/modules.md#usesimulatewithdrawerc20parameters) |

#### Returns

[`UseSimulateWithdrawERC20ReturnType`](/reference/modules.md#usesimulatewithdrawerc20returntype)\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). [UseSimulateWithdrawERC20ReturnType](/reference/modules.md#usesimulatewithdrawerc20returntype)

#### Defined in

[hooks/L2/useSimulateWithdrawERC20.ts:32](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawERC20.ts#L32)

---

### useSimulateWithdrawETH

▸ **useSimulateWithdrawETH**\<`config`, `chainId`\>(`parameters`): [`UseSimulateWithdrawETHReturnType`](/reference/modules.md#usesimulatewithdrawethreturntype)\<`config`, `chainId`\>

Simulates a withdrawal of ETH to an L1 address.

#### Type parameters

| Name      | Type                                          |
| :-------- | :-------------------------------------------- |
| `config`  | extends `Config` = `Config`                   |
| `chainId` | extends `undefined` \| `number` = `undefined` |

#### Parameters

| Name         | Type                                                                                                                | Description                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `parameters` | [`UseSimulateWithdrawETHParameters`](/reference/modules.md#usesimulatewithdrawethparameters)\<`config`, `chainId`\> | [UseSimulateWithdrawETHParameters](/reference/modules.md#usesimulatewithdrawethparameters) |

#### Returns

[`UseSimulateWithdrawETHReturnType`](/reference/modules.md#usesimulatewithdrawethreturntype)\<`config`, `chainId`\>

wagmi [useSimulateContract return type](https://alpha.wagmi.sh/react/api/hooks/useSimulateContract#return-type). [UseSimulateWithdrawETHReturnType](/reference/modules.md#usesimulatewithdrawethreturntype)

#### Defined in

[hooks/L2/useSimulateWithdrawETH.ts:32](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useSimulateWithdrawETH.ts#L32)

---

### useWriteDepositERC20

▸ **useWriteDepositERC20**\<`config`, `context`\>(`parameters?`): [`UseWriteDepositERC20ReturnType`](/reference/modules.md#usewritedepositerc20returntype)\<`config`, `context`\>

Deposits ERC20 tokens to L2 using the standard bridge

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Parameters

| Name         | Type                                                                                                            | Description                                                                            |
| :----------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `parameters` | [`UseWriteDepositERC20Parameters`](/reference/modules.md#usewritedepositerc20parameters)\<`config`, `context`\> | [UseWriteDepositERC20Parameters](/reference/modules.md#usewritedepositerc20parameters) |

#### Returns

[`UseWriteDepositERC20ReturnType`](/reference/modules.md#usewritedepositerc20returntype)\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). [UseWriteDepositERC20ReturnType](/reference/modules.md#usewritedepositerc20returntype)

#### Defined in

[hooks/L1/useWriteDepositERC20.ts:40](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositERC20.ts#L40)

---

### useWriteDepositETH

▸ **useWriteDepositETH**\<`config`, `context`\>(`parameters?`): [`UseWriteDepositETHReturnType`](/reference/modules.md#usewritedepositethreturntype)\<`config`, `context`\>

Deposits ETH to L2 using the OptimismPortal contract

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Parameters

| Name         | Type                                                                                                        | Description                                                                        |
| :----------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `parameters` | [`UseWriteDepositETHParameters`](/reference/modules.md#usewritedepositethparameters)\<`config`, `context`\> | [UseWriteDepositETHParameters](/reference/modules.md#usewritedepositethparameters) |

#### Returns

[`UseWriteDepositETHReturnType`](/reference/modules.md#usewritedepositethreturntype)\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). [UseWriteDepositETHReturnType](/reference/modules.md#usewritedepositethreturntype)

#### Defined in

[hooks/L1/useWriteDepositETH.ts:40](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L1/useWriteDepositETH.ts#L40)

---

### useWriteWithdrawERC20

▸ **useWriteWithdrawERC20**\<`config`, `context`\>(`parameters?`): [`UseWriteWithdrawERC20ReturnType`](/reference/modules.md#usewritewithdrawerc20returntype)\<`config`, `context`\>

Withdraws ERC20 tokens to an L1 address.

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Parameters

| Name         | Type                                                                                                              | Description                                                                              |
| :----------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `parameters` | [`UseWriteWithdrawERC20Parameters`](/reference/modules.md#usewritewithdrawerc20parameters)\<`config`, `context`\> | [UseWriteWithdrawERC20Parameters](/reference/modules.md#usewritewithdrawerc20parameters) |

#### Returns

[`UseWriteWithdrawERC20ReturnType`](/reference/modules.md#usewritewithdrawerc20returntype)\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). [UseWriteWithdrawERC20ReturnType](/reference/modules.md#usewritewithdrawerc20returntype)

#### Defined in

[hooks/L2/useWriteWithdrawERC20.ts:44](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawERC20.ts#L44)

---

### useWriteWithdrawETH

▸ **useWriteWithdrawETH**\<`config`, `context`\>(`parameters?`): [`UseWriteWithdrawETHReturnType`](/reference/modules.md#usewritewithdrawethreturntype)\<`config`, `context`\>

Withdraws ETH to an L1 address.

#### Type parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `config`  | extends `Config` = `Config` |
| `context` | `unknown`                   |

#### Parameters

| Name         | Type                                                                                                          | Description                                                                          |
| :----------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| `parameters` | [`UseWriteWithdrawETHParameters`](/reference/modules.md#usewritewithdrawethparameters)\<`config`, `context`\> | [UseWriteWithdrawETHParameters](/reference/modules.md#usewritewithdrawethparameters) |

#### Returns

[`UseWriteWithdrawETHReturnType`](/reference/modules.md#usewritewithdrawethreturntype)\<`config`, `context`\>

wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). [UseWriteWithdrawETHReturnType](/reference/modules.md#usewritewithdrawethreturntype)

#### Defined in

[hooks/L2/useWriteWithdrawETH.ts:44](https://github.com/base-org/op-wagmi/blob/main/src/hooks/L2/useWriteWithdrawETH.ts#L44)
