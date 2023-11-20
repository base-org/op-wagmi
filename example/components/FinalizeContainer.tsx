import { useState } from 'react'
import { FinalizeWithdrawalTransaction } from './FinalizeWithdrawalTransaction'
import { NetworkSelector } from './NetworkSelector'

const networkToChainId: Record<'optimism' | 'base', number> = {
  base: 84531,
  optimism: 420,
}

export function FinalizeContainer() {
  const [selectedNetwork, setSelectedNetwork] = useState<'optimism' | 'base'>('base')
  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <span className='text-white'>From</span>
      <NetworkSelector selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
      <FinalizeWithdrawalTransaction selectedChainId={networkToChainId[selectedNetwork]} />
    </div>
  )
}
