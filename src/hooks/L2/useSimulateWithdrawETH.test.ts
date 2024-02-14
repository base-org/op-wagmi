import { expect, test } from 'vitest'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useSimulateWithdrawETH } from './useSimulateWithdrawETH.js'

test('useSimulateWithdrawETH', async () => {
  const { result } = renderHook(() =>
    useSimulateWithdrawETH({
      args: {
        to: accounts[0],
        amount: 1n,
      },
      chainId: 8453,
      dataSuffix: '0x1234',
    })
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "chainId": 8453,
        "request": {
          "__mode": "prepared",
          "abi": [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_l2Token",
                  "type": "address",
                },
                {
                  "internalType": "address",
                  "name": "_to",
                  "type": "address",
                },
                {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256",
                },
                {
                  "internalType": "uint32",
                  "name": "_minGasLimit",
                  "type": "uint32",
                },
                {
                  "internalType": "bytes",
                  "name": "_extraData",
                  "type": "bytes",
                },
              ],
              "name": "withdrawTo",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function",
            },
          ],
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0x4200000000000000000000000000000000000010",
          "args": [
            "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            1n,
            0,
            "0x",
          ],
          "chainId": 8453,
          "dataSuffix": "0x1234",
          "functionName": "withdrawTo",
          "value": 1n,
        },
        "result": undefined,
      },
      "dataUpdatedAt": 1700438400000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "simulateContract",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "address": "0x4200000000000000000000000000000000000010",
          "args": [
            "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            1n,
            0,
            "0x",
          ],
          "chainId": 8453,
          "dataSuffix": "0x1234",
          "functionName": "withdrawTo",
          "value": 1n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
