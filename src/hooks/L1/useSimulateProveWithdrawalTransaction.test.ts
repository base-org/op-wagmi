import { expect, test } from 'vitest'
import { renderHook, waitFor } from '../../_test/react.js'
import { useSimulateProveWithdrawalTransaction } from './useSimulateProveWithdrawalTransaction.js'

test('useSimulateProveWithdrawalTransaction', async () => {
  const { result } = renderHook(() =>
    useSimulateProveWithdrawalTransaction({
      args: {
        withdrawalTxHash: '0xf735fdde9e33a002dcfe8d3fb2ca059c585d538a0e3ddc561d6fdcc303cff408',
      },
      l2ChainId: 8453,
      query: { retry: false },
    })
  )

  // We're only checking that we're able to successfully call the contract. The snapshot
  // will continue to change as blocks get produced, and this check is sufficient.
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
}, { retry: 3 })
