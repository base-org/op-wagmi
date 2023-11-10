import { connect, disconnect } from '@wagmi/core'
import { expect, test } from 'vitest'
import { config } from '../../_test/config.js'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useSimulateDepositETH } from './useSimulateDepositETH.js'

const connector = config.connectors[0]!
const portal = '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'

test('useSimulateDepositETH', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() =>
    useSimulateDepositETH({
      args: {
        to: accounts[0],
        gasLimit: 100000,
      },
      portal,
      value: BigInt(1),
      dataSuffix: '0x1234',
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
           "address": "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA",
           "args": [
             "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
             1n,
             100000,
             false,
             "0x",
           ],
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
           "blockNumber": undefined,
           "chainId": 8453,
           "dataSuffix": "0x1234",
           "gasLimit": 100000,
           "gasPrice": undefined,
           "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
           "type": undefined,
           "value": undefined,
         },
       ],
       "refetch": [Function],
       "status": "success",
     }
  `)

  await disconnect(config, { connector })
})
