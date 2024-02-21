import { expect, test } from 'vitest'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteDepositETH } from './useWriteDepositETH.js'

test('useWriteDepositETH', async () => {
  const { result } = renderHook(() => useWriteDepositETH())

  // write contract lazily writes
  // these are low value checks we are testing wagmi here
  expect(result.current.writeDepositETH).toBeDefined()
  expect(result.current.writeDepositETH).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  // go ahead and trigger the write
  result.current.writeDepositETH({ args: { to: accounts[0], amount: 1n }, l2ChainId: 8453 })

  // since we didn't use the async wait for it to succeed
  await waitFor(() => {
    return Promise.all([
      expect(result.current.error).toBeNull(),
      expect(result.current.isSuccess).toBeTruthy(),
    ])
  })

  // now assert the result is what we expect
  expect(result.current).toMatchInlineSnapshot(`
    {
      "context": undefined,
      "data": "${result.current.data}",
      "error": null,
      "failureCount": 0,
      "failureReason": null,
      "isError": false,
      "isIdle": false,
      "isPaused": false,
      "isPending": false,
      "isSuccess": true,
      "reset": [Function],
      "status": "success",
      "submittedAt": 1700438400000,
      "variables": {
        "args": {
          "amount": 1n,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        },
        "l2ChainId": 8453,
      },
      "writeDepositETH": [Function],
      "writeDepositETHAsync": [Function],
    }
  `)
})
