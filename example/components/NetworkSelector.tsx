type NetworkSelectorProps = {
  selectedNetwork: 'optimismSepolia' | 'baseSepolia' | 'sepolia'
  setSelectedNetwork: (network: 'optimismSepolia' | 'baseSepolia' | 'sepolia') => void
}

export function NetworkSelector({ selectedNetwork, setSelectedNetwork }: NetworkSelectorProps) {
  return (
    <div className='flex flex-row justify-center items-center self-center w-48 rounded-full divide-x bg-white'>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-l-full ${
          selectedNetwork === 'baseSepolia'
            ? 'bg-blue-500 text-white shadow-inner shadow-stone-900'
            : 'bg-white text-black'
        }`}
        onClick={() => setSelectedNetwork('baseSepolia')}
      >
        Base
      </button>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-r-full ${
          selectedNetwork === 'optimismSepolia'
            ? 'bg-red-600 text-white shadow-inner shadow-stone-900'
            : 'bg-white text-black'
        }`}
        onClick={() => setSelectedNetwork('optimismSepolia')}
      >
        Optimism
      </button>
    </div>
  )
}
