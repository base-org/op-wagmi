'use client'

import { useConfig } from 'wagmi'
import { type OpConfig } from '../types/OpConfig.js'

export type UseConfigParameters<config extends OpConfig = OpConfig> = ConfigParameter<config>

export type ConfigParameter<config extends OpConfig = OpConfig> = {
  config?: OpConfig | config | undefined
}

export type UseConfigReturnType<config extends OpConfig = OpConfig> = config

export function useOpConfig<config extends OpConfig>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  const config = parameters.config ?? useConfig(parameters)

  // TODO: Return a better error here
  if (!config) throw new Error()
  return config as UseConfigReturnType<config>
}
