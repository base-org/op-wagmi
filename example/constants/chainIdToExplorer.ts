import { base, optimism } from 'viem/chains'

export const chainIdToExplorer: Record<number, string> = {
  [base.id]: base.blockExplorers.default.url,
  [optimism.id]: optimism.blockExplorers.default.url,
}
