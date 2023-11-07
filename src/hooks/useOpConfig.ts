'use client'

import { type Config, useConfig } from 'wagmi'
import { type OpConfig } from '../types/OpConfig.js'

export type UseConfigParameters<config extends Config = OpConfig> = ConfigParameter<config>

export type ConfigParameter<config extends Config = OpConfig> = {
  config?: OpConfig | config | undefined
}

export type UseConfigReturnType<config extends OpConfig = OpConfig> = config

export function useOpConfig<config extends Config>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<OpConfig> {
  const config = parameters.config ?? useConfig(parameters)

  // TODO: Return a better error here
  if (!config) throw new Error('No Wagmi Context provider found')
  return config as UseConfigReturnType<OpConfig>
}
