import type { WriteContractReturnType } from '@wagmi/core'
import type { Config, UseWriteContractReturnType } from 'wagmi'
import type { OpConfig } from './OpConfig.js'

export type UseWriteOPActionBaseReturnType<
  args,
  config extends Config = OpConfig,
  context = unknown,
> =
  & Omit<UseWriteContractReturnType<config, context>, 'writeContract' | 'writeContractAsync'>
  & {
    write: (args: args) => void
    writeAsync: (
      args: args,
    ) => Promise<WriteContractReturnType>
  }
