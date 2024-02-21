import { baseSepolia, optimismSepolia, sepolia } from 'viem/chains'

export const networkToChainId: Record<string, number> = {
  sepolia: sepolia.id,
  baseSepolia: baseSepolia.id,
  optimismSepolia: optimismSepolia.id,
}
