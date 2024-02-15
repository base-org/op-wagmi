import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import { useConfig, useReadContract, type UseReadContractParameters, type UseReadContractReturnType } from 'wagmi'
import { validateL2Chain, validateL2OutputOracleContract } from '../../util/validateChains.js'

export function useGetL2OutputIndexAfter(
  { l2ChainId, blockNumber, ...rest }: {
    blockNumber?: bigint
    l2ChainId: number
  } & UseReadContractParameters,
) {
  const config = useConfig(rest)

  const { l2Chain, l1ChainId } = validateL2Chain(config, l2ChainId)
  const l2OutputOracle = validateL2OutputOracleContract(l1ChainId, l2Chain).address

  const result = useReadContract({
    abi: l2OutputOracleABI,
    address: l2OutputOracle,
    functionName: 'getL2OutputIndexAfter',
    args: [blockNumber || 0n],
    query: {
      enabled: Boolean(blockNumber),
    },
    ...rest,
  })

  return result as UseReadContractReturnType<typeof l2OutputOracleABI, 'getL2OutputIndexAfter', [bigint], bigint>
}
