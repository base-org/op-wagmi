import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import {
  getL2HashesForDepositTx,
  type WriteDepositERC20Parameters as WriteDepositERC20ActionParameters,
} from 'op-viem/actions'
import { useEffect, useState } from 'react'
import { usePublicClient, useWriteContract } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

export type WriteDepositERC20Parameters = Pick<WriteDepositERC20ActionParameters, 'args'>

export type UseWriteDepositERC20Parameters<config extends Config = OpConfig, context = unknown> =
  & UseWriteOPActionBaseParameters<config, context>
  & { l2ChainId: number }

export type UseWriteDepositERC20ReturnType<config extends Config = OpConfig, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositERC20: UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>['write']
    writeDepositERC20Async: UseWriteOPActionBaseReturnType<WriteDepositERC20Parameters, config, context>['writeAsync']
    l2TxHash: `0x${string}` | undefined
  }

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link UseWriteDepositERC20Parameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositERC20ReturnType}
 */
export function useWriteDepositERC20<config extends Config = OpConfig, context = unknown>(
  { l2ChainId, ...rest }: UseWriteDepositERC20Parameters<config, context>,
): UseWriteDepositERC20ReturnType<config, context> {
  const config = useOpConfig(rest)
  const l2Chain = config.l2chains[l2ChainId]
  const l2Client = usePublicClient({ chainId: l2Chain.l1ChaindId })
  const [l2TxHash, setL2TxHash] = useState<`0x${string}` | undefined>(undefined)
  const { writeContract, writeContractAsync, ...writeReturn } = useWriteContract()

  useEffect(() => {
    void (async () => {
      if (writeReturn.data) {
        const l1TxReceipt = await waitForTransactionReceipt(config, {
          chainId: l2Chain.l1ChaindId,
          hash: writeReturn.data,
          confirmations: 1,
        })
        const l2Hashes = await getL2HashesForDepositTx(l2Client, { l1TxReceipt })
        setL2TxHash(l2Hashes[0])
      }
    })()
  }, [l2Client, writeReturn])

  return {
    writeDepositERC20: ({ args }: WriteDepositERC20Parameters) =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.l1StandardBridge.address,
        abi: l1StandardBridgeABI,
        functionName: 'depositERC20To',
        args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    writeDepositERC20Async: ({ args }: WriteDepositERC20Parameters) =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.l1StandardBridge.address,
        abi: l1StandardBridgeABI,
        functionName: 'depositERC20To',
        args: [args.l1Token, args.l2Token, args.to, args.amount, args.minGasLimit, args.extraData || '0x'],
      }),
    l2TxHash,
    ...writeReturn,
  } as unknown as UseWriteDepositERC20ReturnType<config, context>
}
