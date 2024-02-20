import { base, optimism } from 'viem/chains'

export const networkToChainId: Record<'optimism' | 'base', number> = {
  base: base.id,
  optimism: optimism.id,
}
