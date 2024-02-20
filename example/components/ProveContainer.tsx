import { networkToChainId } from '@/constants/networkToChainId'
import { useState } from 'react'
import { NetworkSelector } from './NetworkSelector'
import { ProveWithdrawalTransaction } from './ProveWithdrawalTransaction'

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
