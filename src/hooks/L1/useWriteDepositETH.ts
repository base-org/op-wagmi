import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import {
  getL2HashesForDepositTx,
  type WriteDepositETHParameters as WriteDepositETHActionParameters,
} from 'op-viem/actions'
import { useEffect, useState } from 'react'
import { usePublicClient, useWriteContract } from 'wagmi'
import type { OpConfig } from '../../types/OpConfig.js'
import type { UseWriteOPActionBaseParameters } from '../../types/UseWriteOPActionBaseParameters.js'
import type { UseWriteOPActionBaseReturnType } from '../../types/UseWriteOPActionBaseReturnType.js'
import { useOpConfig } from '../useOpConfig.js'

export type WriteDepositETHParameters = Pick<WriteDepositETHActionParameters, 'args'>

export type UseWriteDepositETHParameters<config extends Config = OpConfig, context = unknown> =
  & UseWriteOPActionBaseParameters<config, context>
  & { l2ChainId: number }

export type UseWriteDepositETHReturnType<config extends Config = OpConfig, context = unknown> =
  & Omit<UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>, 'write' | 'writeAsync'>
  & {
    writeDepositETH: UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>['write']
    writeDepositETHAsync: UseWriteOPActionBaseReturnType<WriteDepositETHParameters, config, context>['writeAsync']
    l2TxHash: `0x${string}` | undefined
  }

/**
 * Deposits ETH to L2 using the OptimismPortal contract
 * @param parameters - {@link UseWriteDepositETHParameters}
 * @returns wagmi [useWriteContract return type](https://alpha.wagmi.sh/react/api/hooks/useWrtieContract#return-type). {@link UseWriteDepositETHReturnType}
 */
export function useWriteDepositETH<config extends Config = OpConfig, context = unknown>(
  { l2ChainId, ...rest }: UseWriteDepositETHParameters<config, context>,
): UseWriteDepositETHReturnType<config, context> {
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
    writeDepositETH: ({ args }: WriteDepositETHParameters) =>
      writeContract({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.portal.address,
        abi: optimismPortalABI,
        functionName: 'depositTransaction',
        args: [args.to, args.amount, BigInt(args.gasLimit), false, args.data ?? '0x'],
        value: args.amount,
      }),
    writeDepositETHAsync: ({ args }: WriteDepositETHParameters) =>
      writeContractAsync({
        chainId: l2Chain.l1ChaindId,
        address: l2Chain.l1Addresses.portal.address,
        abi: optimismPortalABI,
        functionName: 'depositTransaction',
        args: [args.to, args.amount, BigInt(args.gasLimit), false, args.data ?? '0x'],
        value: args.amount,
      }),
    l2TxHash,
    ...writeReturn,
  } as unknown as UseWriteDepositETHReturnType<config, context>
}
