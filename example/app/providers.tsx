'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { baseGoerli, goerli } from 'wagmi/chains'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [goerli, baseGoerli],
  transports: {
    [goerli.id]: http(),
    [baseGoerli.id]: http(),
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
