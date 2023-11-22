import type { Config, UseWriteContractParameters } from 'wagmi'
import type { OpConfig } from './OpConfig.js'

export type UseWriteOPActionBaseParameters<
  config extends Config = OpConfig,
  context = unknown,
> = UseWriteContractParameters<config, context>
