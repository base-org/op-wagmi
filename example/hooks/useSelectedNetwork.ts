import { useState } from 'react'

export function useSelectedNetwork(defaultNetwork: 'optimismSepolia' | 'baseSepolia' | 'sepolia' = 'baseSepolia') {
  const [selectedNetwork, setSelectedNetwork] = useState<'optimismSepolia' | 'baseSepolia' | 'sepolia'>(defaultNetwork)

  return { selectedNetwork, setSelectedNetwork }
}
