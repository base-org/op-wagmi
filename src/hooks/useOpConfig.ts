'use client'

import { type Config, useConfig } from 'wagmi'
import { base } from '../constants/chains/base.js'
import { baseGoerli } from '../constants/chains/baseGoerli.js'
import { optimism } from '../constants/chains/optimism.js'
import { optimismGoerli } from '../constants/chains/optimismGoerli.js'
import { zora } from '../constants/chains/zora.js'
import { zoraGoerli } from '../constants/chains/zoraGoerli.js'
import { type OpConfig } from '../types/OpConfig.js'

export type UseConfigParameters<config extends Config = Config> = ConfigParameter<config>

export type ConfigParameter<config extends Config = Config> = {
  config?: OpConfig | config | undefined
}

export type UseConfigReturnType<config extends OpConfig = OpConfig> = config

const chains = { 8453: base, 84531: baseGoerli, 420: optimismGoerli, 10: optimism, 7777777: zora, 999: zoraGoerli }

export function useOpConfig<config extends Config>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<OpConfig> {
  const config: UseConfigReturnType<OpConfig> = {
    ...useConfig(parameters),
    l2chains: { ...chains, ...(parameters?.config as OpConfig)?.l2chains },
  }

  // TODO: Return a better error here
  if (!config) throw new Error('No Wagmi Context provider found')
  return config as UseConfigReturnType<OpConfig>
}
