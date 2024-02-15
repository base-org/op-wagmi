import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import { useConfig, useReadContract, type UseReadContractParameters, type UseReadContractReturnType } from 'wagmi'

export function useGetL2OutputIndexAfter(
  { l2ChainId, blockNumber, config, ...rest }: {
    blockNumber?: bigint
    l2ChainId: number
    config?: OpConfig
  } & UseReadContractParameters,
) {
  const opConfig = useConfig({ config })
  const l2Chain = opConfig.l2chains[l2ChainId]

  if (!l2Chain) {
    throw new Error('L2 chain not configured')
  }

  const result = useReadContract({
    abi: l2OutputOracleABI,
    address: l2Chain.l1Addresses.l2OutputOracle.address,
    functionName: 'getL2OutputIndexAfter',
    args: [blockNumber || 0n],
    query: {
      enabled: Boolean(blockNumber),
    },
    ...rest,
  })

  return result as UseReadContractReturnType<typeof l2OutputOracleABI, 'getL2OutputIndexAfter', [bigint], bigint>
}
