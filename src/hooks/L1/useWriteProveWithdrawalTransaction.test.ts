import { expect, test } from 'vitest'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteProveWithdrawalTransaction } from './useWriteProveWithdrawalTransaction.js'

test('useWriteProveWithdrawalTransaction', async () => {
  const { result } = renderHook(() => useWriteProveWithdrawalTransaction())

  expect(result.current.writeProveWithdrawalTransaction).toBeDefined()
  expect(result.current.writeProveWithdrawalTransaction).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  result.current.writeProveWithdrawalTransaction({
    args: {
      withdrawalTxHash: '0xf735fdde9e33a002dcfe8d3fb2ca059c585d538a0e3ddc561d6fdcc303cff408',
    },
    l2ChainId: 8453,
  })

  await waitFor(() => {
    return Promise.all([
      expect(result.current.error).toBeNull(),
      // We're only checking that we're able to successfully call the contract. The snapshot
      // will continue to change as blocks get produced, and this check is sufficient.
      expect(result.current.isSuccess).toBeTruthy(),
    ])
  })
}, { retry: 3 })
