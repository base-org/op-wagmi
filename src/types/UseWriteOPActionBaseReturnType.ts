import type { WriteContractReturnType } from '@wagmi/core'
import type { Config, UseWriteContractReturnType } from 'wagmi'

export type UseWriteOPActionBaseReturnType<
  args extends { chainId?: number },
  config extends Config = Config,
  context = unknown,
> =
  & { guh: number }
  & Omit<UseWriteContractReturnType<config, context>, 'writeContract' | 'writeContractAsync'>
  & {
    write: (args: args) => void
    writeAsync: (
      args: args,
    ) => Promise<WriteContractReturnType>
  }
