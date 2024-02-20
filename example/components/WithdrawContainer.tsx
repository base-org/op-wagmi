import { networkToChainId } from '@/constants/networkToChainId'
import { useState } from 'react'
import { AssetTypeToggle } from './AssetTypeToggle'
import { NetworkSelector } from './NetworkSelector'
import { WithdrawERC20 } from './WithdrawERC20'
import { WithdrawETH } from './WithdrawETH'

export function WithdrawContainer() {
  const [selectedAssetType, setSelectedAssetType] = useState<'eth' | 'erc20'>('eth')
  const [selectedNetwork, setSelectedNetwork] = useState<'optimism' | 'base'>('base')
  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <AssetTypeToggle selectedAssetType={selectedAssetType} setSelectedAssetType={setSelectedAssetType} />
      <span className='text-white'>From</span>
      <NetworkSelector selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
      {selectedAssetType === 'eth' && <WithdrawETH selectedChainId={networkToChainId[selectedNetwork]} />}
      {selectedAssetType === 'erc20' && <WithdrawERC20 selectedChainId={networkToChainId[selectedNetwork]} />}
    </div>
  )
}
