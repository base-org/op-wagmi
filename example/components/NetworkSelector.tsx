type NetworkSelectorProps = {
  selectedNetwork: 'optimism' | 'base'
  setSelectedNetwork: (network: 'optimism' | 'base') => void
}

export function NetworkSelector({ selectedNetwork, setSelectedNetwork }: NetworkSelectorProps) {
  return (
    <div className='flex flex-row justify-center items-center self-center w-48 rounded-full divide-x bg-white'>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-l-full ${
          selectedNetwork === 'base' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
        }`}
        onClick={() => setSelectedNetwork('base')}
      >
        Base
      </button>
      <button
        className={`w-24 flex items-center justify-center h-8 rounded-r-full ${
          selectedNetwork === 'optimism'
            ? 'bg-red-600 text-white shadow-inner shadow-stone-900'
            : 'bg-white text-black'
        }`}
        onClick={() => setSelectedNetwork('optimism')}
      >
        Optimism
      </button>
    </div>
  )
}
