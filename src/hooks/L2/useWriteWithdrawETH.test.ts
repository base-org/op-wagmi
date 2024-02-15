import { expect, test } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { accounts } from '../../_test/constants.js'
import { renderHook, waitFor } from '../../_test/react.js'
import { useWriteWithdrawETH } from './useWriteWithdrawETH.js'

test('useWriteWithdrawETH', async () => {
  const { result } = renderHook(() => ({
    useWriteWithdrawETH: useWriteWithdrawETH(),
    useSwitchChain: useSwitchChain(),
  }))

  // Mocked account is connected to L1 by default, so switch to L2 first.
  await result.current.useSwitchChain.switchChainAsync({ chainId: 8453 })

  expect(result.current.useWriteWithdrawETH.writeWithdrawETH).toBeDefined()
  expect(result.current.useWriteWithdrawETH.writeWithdrawETH).toBeDefined()
  expect(result.current.useWriteWithdrawETH.data).toBeUndefined()
  expect(result.current.useWriteWithdrawETH.isIdle).toBe(true)

  result.current.useWriteWithdrawETH.writeWithdrawETH({
    args: {
      to: accounts[0],
      amount: 0n,
    },
    chainId: 8453,
  })

  await waitFor(() => {
    return Promise.all([
      expect(result.current.useWriteWithdrawETH.error).toBeNull(),
      expect(result.current.useWriteWithdrawETH.isSuccess).toBeTruthy(),
    ])
  })

  expect(result.current.useWriteWithdrawETH).toMatchInlineSnapshot(`
    {
      "context": undefined,
      "data": "${result.current.useWriteWithdrawETH.data}",
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
                "name": "_otherBridge",
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
            "name": "DepositFinalized",
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
            "name": "WithdrawalInitiated",
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
            "name": "finalizeDeposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [],
            "name": "l1TokenBridge",
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
            "inputs": [
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
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
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
          {
            "stateMutability": "payable",
            "type": "receive",
          },
        ],
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "address": "0x4200000000000000000000000000000000000010",
        "args": [
          "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          0n,
          0,
          "0x",
        ],
        "chainId": 8453,
        "functionName": "withdrawTo",
        "value": 0n,
      },
      "writeWithdrawETH": [Function],
      "writeWithdrawETHAsync": [Function],
    }
  `)
}, { retry: 3 })
