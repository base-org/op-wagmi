import { expect, test } from 'vitest'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteDepositERC20 } from './useWriteDepositERC20.js'

test('useWriteDepositERC20', async () => {
  const { result } = renderHook(() => useWriteDepositERC20())

  expect(result.current.writeDepositERC20).toBeDefined()
  expect(result.current.writeDepositERC20).toBeDefined()
  expect(result.current.data).toBeUndefined()
  expect(result.current.isIdle).toBe(true)

  result.current.writeDepositERC20({
    args: {
      l1Token: '0xbe9895146f7af43049ca1c1ae358b0541ea49704',
      l2Token: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
      to: accounts[0],
      amount: 0n,
      extraData: '0x',
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
        "abi": [
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "_messenger",
                "type": "address",
              },
            ],
            "stateMutability": "nonpayable",
            "type": "constructor",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "localToken",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "remoteToken",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ERC20BridgeFinalized",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "localToken",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "remoteToken",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ERC20BridgeInitiated",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "l1Token",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "l2Token",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ERC20DepositInitiated",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "l1Token",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "l2Token",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ERC20WithdrawalFinalized",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ETHBridgeFinalized",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ETHBridgeInitiated",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ETHDepositInitiated",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes",
              },
            ],
            "name": "ETHWithdrawalFinalized",
            "type": "event",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_localToken",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_remoteToken",
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
            "name": "bridgeERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_localToken",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_remoteToken",
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
            "name": "bridgeERC20To",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
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
            "name": "bridgeETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_to",
                "type": "address",
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
            "name": "bridgeETHTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_l1Token",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_l2Token",
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
            "name": "depositERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_l1Token",
                "type": "address",
              },
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
            "name": "depositERC20To",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
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
            "name": "depositETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_to",
                "type": "address",
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
            "name": "depositETHTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address",
              },
            ],
            "name": "deposits",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_localToken",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_remoteToken",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_from",
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
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes",
              },
            ],
            "name": "finalizeBridgeERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_from",
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
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes",
              },
            ],
            "name": "finalizeBridgeETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_l1Token",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_l2Token",
                "type": "address",
              },
              {
                "internalType": "address",
                "name": "_from",
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
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes",
              },
            ],
            "name": "finalizeERC20Withdrawal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_from",
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
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes",
              },
            ],
            "name": "finalizeETHWithdrawal",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [],
            "name": "l2TokenBridge",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [],
            "name": "messenger",
            "outputs": [
              {
                "internalType": "contract CrossDomainMessenger",
                "name": "",
                "type": "address",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [],
            "name": "version",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "stateMutability": "payable",
            "type": "receive",
          },
        ],
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "address": "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        "args": [
          "0xbe9895146f7af43049ca1c1ae358b0541ea49704",
          "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          0n,
          0,
          "0x",
        ],
        "chainId": 1,
        "functionName": "depositERC20To",
      },
      "writeDepositERC20": [Function],
      "writeDepositERC20Async": [Function],
    }
  `)
}, { retry: 3 })
