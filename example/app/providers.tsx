'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base, mainnet, optimism],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
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
