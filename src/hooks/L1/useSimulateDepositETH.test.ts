import { expect, test } from 'vitest'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useSimulateDepositETH } from './useSimulateDepositETH.js'

test('useSimulateDepositETH', async () => {
  const { result } = renderHook(() =>
    useSimulateDepositETH({
      args: {
        to: accounts[0],
        amount: 1n,
      },
      l2ChainId: 8453,
      dataSuffix: '0x1234',
    })
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
   {
       "data": {
         "chainId": 1,
         "request": {
           "__mode": "prepared",
           "abi": [
             {
               "inputs": [
                 {
                   "internalType": "address",
                   "name": "_to",
                   "type": "address",
                 },
                 {
                   "internalType": "uint256",
                   "name": "_value",
                   "type": "uint256",
                 },
                 {
                   "internalType": "uint64",
                   "name": "_gasLimit",
                   "type": "uint64",
                 },
                 {
                   "internalType": "bool",
                   "name": "_isCreation",
                   "type": "bool",
                 },
                 {
                   "internalType": "bytes",
                   "name": "_data",
                   "type": "bytes",
                 },
               ],
               "name": "depositTransaction",
               "outputs": [],
               "stateMutability": "payable",
               "type": "function",
             },
           ],
           "account": {
             "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
             "type": "json-rpc",
           },
           "address": "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
           "args": [
             "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
             1n,
             21000n,
             false,
             "0x",
           ],
           "chainId": 1,
           "dataSuffix": "0x1234",
           "functionName": "depositTransaction",
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
           "address": "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
           "args": [
             "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
             1n,
             21000n,
             false,
             "0x",
           ],
           "chainId": 1,
           "dataSuffix": "0x1234",
           "functionName": "depositTransaction",
           "value": 1n,
         },
       ],
       "refetch": [Function],
       "status": "success",
     }
  `)
})
