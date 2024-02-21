import { networkToChainId } from '@/constants/networkToChainId'
import { useSelectedNetwork } from '@/hooks/useSelectedNetwork'
import { useState } from 'react'
import { AssetTypeToggle } from './AssetTypeToggle'
import { DepositERC20 } from './DepositERC20'
import { DepositETH } from './DepositETH'
import { NetworkSelector } from './NetworkSelector'

export function DepositContainer() {
  const [selectedAssetType, setSelectedAssetType] = useState<'eth' | 'erc20'>('eth')
  const { selectedNetwork, setSelectedNetwork } = useSelectedNetwork('baseSepolia')
  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <AssetTypeToggle selectedAssetType={selectedAssetType} setSelectedAssetType={setSelectedAssetType} />
      <span className='text-white'>To</span>
      <NetworkSelector selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
      {selectedAssetType === 'eth' && <DepositETH selectedChainId={networkToChainId[selectedNetwork]} />}
      {selectedAssetType === 'erc20' && <DepositERC20 selectedChainId={networkToChainId[selectedNetwork]} />}
    </div>
  )
}
