import { connect, disconnect } from '@wagmi/core'
import { baseAddresses } from 'op-viem/chains'
import { base } from 'viem/chains'
import { expect, test } from 'vitest'
import { config } from '../../_test/config.js'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteDepositERC20 } from './useWriteDepositERC20.js'

const connector = config.connectors[0]!

test(useWriteDepositERC20.name, async () => {
  await connect(config, { connector })

  const { result } = renderHook(() =>
    useWriteDepositERC20({
      l2ChainId: base.id,
      args: {
        l1Token: '0xTokenAddressL1',
        l2Token: '0xTokenAddressL2',
        to: accounts[0],
        amount: 100n, // Assuming amount is in BigInt format
        minGasLimit: 21000,
        extraData: '0x',
      },
      ...baseAddresses,
    })
  )

  expect(result.current.writeDepositERC20).toBeDefined()
  expect(result.current.writeDepositERC20Async).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  result.current.writeDepositERC20()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot()

  await disconnect(config, { connector })
})
