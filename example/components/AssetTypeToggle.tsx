type AssetTypeToggleProps = {
  selectedAssetType: 'eth' | 'erc20'
  setSelectedAssetType: (assetType: 'eth' | 'erc20') => void
}

export function AssetTypeToggle({ selectedAssetType, setSelectedAssetType }: AssetTypeToggleProps) {
  return (
    <div className='flex flex-row justify-center items-center self-center w-48 rounded-full divide-x bg-white'>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-l-full ${
          selectedAssetType === 'eth' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
        }`}
        onClick={() => setSelectedAssetType('eth')}
      >
        ETH
      </button>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-r-full ${
          selectedAssetType === 'erc20'
            ? 'bg-blue-500 text-white shadow-inner shadow-stone-900'
            : 'bg-white text-black'
        }`}
        onClick={() => setSelectedAssetType('erc20')}
      >
        ERC-20
      </button>
    </div>
  )
}
