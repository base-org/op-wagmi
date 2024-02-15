import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Abi } from 'viem'
import { useConfig, useReadContract, type UseReadContractParameters, type UseReadContractReturnType } from 'wagmi'

export function useBlockNumberOfLatestL2OutputProposal(
  { l2ChainId, config, ...rest }: { l2ChainId: number; config?: OpConfig } & UseReadContractParameters,
) {
  const opConfig = useConfig({ config })
  const l2Chain = opConfig.l2chains[l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const result = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'latestBlockNumber',
    args: [],
    ...rest,
  })

  return result as UseReadContractReturnType<Abi, 'latestBlockNumber', [], bigint>
}
