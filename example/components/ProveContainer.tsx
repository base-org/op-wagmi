import { useState } from 'react'
import { NetworkSelector } from './NetworkSelector'
import { ProveWithdrawalTransaction } from './ProveWithdrawalTransaction'

const networkToChainId: Record<'optimism' | 'base', number> = {
  base: 84531,
  optimism: 420,
}

export function ProveContainer() {
  const [selectedNetwork, setSelectedNetwork] = useState<'optimism' | 'base'>('base')
  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <span className='text-white'>From</span>
      <NetworkSelector selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
      <ProveWithdrawalTransaction selectedChainId={networkToChainId[selectedNetwork]} />
    </div>
  )
}
