import type { Config, UseWriteContractParameters } from 'wagmi'

export type UseWriteOPActionBaseParameters<
  config extends Config = Config,
  context = unknown,
> = UseWriteContractParameters<config, context>
