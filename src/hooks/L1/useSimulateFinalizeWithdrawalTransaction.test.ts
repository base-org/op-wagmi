import { expect, test } from 'vitest'
import { renderHook, waitFor } from '../../_test/react.js'
import { useSimulateFinalizeWithdrawalTransaction } from './useSimulateFinalizeWithdrawalTransaction.js'

test('useSimulateFinalizeWithdrawalTransaction', async () => {
  const { result } = renderHook(() =>
    useSimulateFinalizeWithdrawalTransaction({
      args: {
        withdrawalTxHash: '0xe602bbed1f47b362d5dfde374f4a390d89a282d27772fc16db162f1b1f33df43',
      },
      l2ChainId: 8453,
      query: { retry: false },
    })
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "request": {
          "abi": [
            {
              "inputs": [
                {
                  "components": [
                    {
                      "internalType": "uint256",
                      "name": "nonce",
                      "type": "uint256",
                    },
                    {
                      "internalType": "address",
                      "name": "sender",
                      "type": "address",
                    },
                    {
                      "internalType": "address",
                      "name": "target",
                      "type": "address",
                    },
                    {
                      "internalType": "uint256",
                      "name": "value",
                      "type": "uint256",
                    },
                    {
                      "internalType": "uint256",
                      "name": "gasLimit",
                      "type": "uint256",
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes",
                    },
                  ],
                  "internalType": "struct Types.WithdrawalTransaction",
                  "name": "_tx",
                  "type": "tuple",
                },
              ],
              "name": "finalizeWithdrawalTransaction",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
          "args": [
            {
              "data": "0xd764ad0b000100000000000000000000000000000000000000000000000000000000072800000000000000000000000042000000000000000000000000000000000000100000000000000000000000003154cf16ccdb4c6d922629664174b904d80f2c35000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000186a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001040166a07a000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000d9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca000000000000000000000000b85c1a4062c877145b5cbf623d3625158611b1500000000000000000000000007aa3fca04e32189529f8b24f6d3cf4a8ada68ca6000000000000000000000000000000000000000000000000000000000000138800000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000001010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "gasLimit": 390747n,
              "nonce": 1766847064778384329583297500742918515827483896875618958121606201292645266n,
              "sender": "0x4200000000000000000000000000000000000007",
              "target": "0x866E82a600A1414e583f7F13623F1aC5d58b0Afa",
              "value": 0n,
              "withdrawalHash": "0x72ad06241743ba6acbe9f54279780f39140f14f111aa0cb4a34b8bffaa0ce389",
            },
          ],
          "dataSuffix": undefined,
          "functionName": "finalizeWithdrawalTransaction",
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
          "action": "finalizeWithdrawalTransaction",
          "blockNumber": undefined,
          "chainId": 1,
          "gasPrice": undefined,
          "type": undefined,
          "value": undefined,
          "withdrawalTxHash": "0xe602bbed1f47b362d5dfde374f4a390d89a282d27772fc16db162f1b1f33df43",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
}, { retry: 3 })
