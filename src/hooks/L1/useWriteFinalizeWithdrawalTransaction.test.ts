import { expect, test } from 'vitest'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteFinalizeWithdrawalTransaction } from './useWriteFinalizeWithdrawalTransaction.js'

test('useWriteFinalizeWithdrawalTransaction', async () => {
  const { result } = renderHook(() => useWriteFinalizeWithdrawalTransaction())

  expect(result.current.writeFinalizeWithdrawalTransaction).toBeDefined()
  expect(result.current.writeFinalizeWithdrawalTransaction).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  result.current.writeFinalizeWithdrawalTransaction({
    args: {
      withdrawalTxHash: '0xe602bbed1f47b362d5dfde374f4a390d89a282d27772fc16db162f1b1f33df43',
    },
    l2ChainId: 8453,
  })

  await waitFor(() => {
    return Promise.all([
      expect(result.current.error).toBeNull(),
      expect(result.current.isSuccess).toBeTruthy(),
    ])
  })

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
          "withdrawalTxHash": "0xe602bbed1f47b362d5dfde374f4a390d89a282d27772fc16db162f1b1f33df43",
        },
        "l2ChainId": 8453,
      },
      "writeFinalizeWithdrawalTransaction": [Function],
      "writeFinalizeWithdrawalTransactionAsync": [Function],
    }
  `)
}, { retry: 3 })
