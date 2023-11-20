'use client'

import { type Config, useConfig } from 'wagmi'
import { base } from '../constants/chains/base.js'
import { baseGoerli } from '../constants/chains/baseGoerli.js'
import { optimismGoerli } from '../constants/chains/optimismGoerli.js'
import { type OpConfig } from '../types/OpConfig.js'

export type UseConfigParameters<config extends Config = OpConfig> = ConfigParameter<config>

export type ConfigParameter<config extends Config = OpConfig> = {
  config?: OpConfig | config | undefined
}

export type UseConfigReturnType<config extends OpConfig = OpConfig> = config

const chains = { 8453: base, 84531: baseGoerli, 420: optimismGoerli }

export function useOpConfig<config extends Config>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<OpConfig> {
  const config: UseConfigReturnType<OpConfig> = { l2chains: chains, ...(parameters.config ?? useConfig(parameters)) }

  // TODO: Return a better error here
  if (!config) throw new Error('No Wagmi Context provider found')
  return config as UseConfigReturnType<OpConfig>
}
