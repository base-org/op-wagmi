import { baseAddresses } from 'op-viem/chains'
import { base } from 'viem/chains'
import { expect, test } from 'vitest'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteDepositETH } from './useWriteDepositETH.js'

test(useWriteDepositETH.name, async () => {
  const { result } = renderHook(() =>
    useWriteDepositETH({
      l2ChainId: base.id,
      args: {
        to: accounts[0],
        gasLimit: 21000,
        data: '0x',
        // typescript wasn't compiling for me for some reason
        ...{ amount: 1n },
      },
      ...baseAddresses,
    })
  )

  // write contract lazily writes
  // these are low value checks we are testing wagmi here
  expect(result.current.writeDepositETH).toBeDefined()
  expect(result.current.writeDepositETHAsync).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  // go ahead and trigger the write
  result.current.writeDepositETH()

  // since we didn't use the async wait for it to succeed
  await waitFor(() => {
    // check for error first so if one happens we can see it in the test failure
    expect(result.current.error).toBeUndefined()
    expect(result.current.isSuccess).toBeTruthy()
  })

  // now assert the result is what we expect
  expect(result.current).toMatchInlineSnapshot()
})
