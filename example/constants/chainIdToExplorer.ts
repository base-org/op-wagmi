import { blastSepolia, optimismSepolia, sepolia } from 'viem/chains'

export const chainIdToExplorer: Record<number, string> = {
  [sepolia.id]: sepolia.blockExplorers.default.url,
  [blastSepolia.id]: blastSepolia.blockExplorers.default.url,
  [optimismSepolia.id]: optimismSepolia.blockExplorers.default.url,
}
