'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { baseSepolia, optimismSepolia, sepolia } from 'wagmi/chains'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [sepolia, baseSepolia, optimismSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
})

export function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
