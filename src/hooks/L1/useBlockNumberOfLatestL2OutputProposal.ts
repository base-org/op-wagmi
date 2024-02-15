import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Abi } from 'viem'
import { useConfig, useReadContract, type UseReadContractParameters, type UseReadContractReturnType } from 'wagmi'
import { validateL2Chain, validateL2OutputOracleContract } from '../../util/validateChains.js'

export function useBlockNumberOfLatestL2OutputProposal(
  { l2ChainId, ...rest }: { l2ChainId: number } & UseReadContractParameters,
) {
  const config = useConfig(rest)

  const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)
  const l2OutputOracle = validateL2OutputOracleContract(l1ChainId, l2Chain).address

  const result = useReadContract({
    abi: l2OutputOracleABI,
    address: l2OutputOracle,
    functionName: 'latestBlockNumber',
    args: [],
    ...rest,
  })

  return result as UseReadContractReturnType<Abi, 'latestBlockNumber', [], bigint>
}
