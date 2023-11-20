type BridgeToggleProps = {
  action: 'deposit' | 'withdraw' | 'prove' | 'finalize'
  setAction: (action: 'deposit' | 'withdraw' | 'prove' | 'finalize') => void
}

export function BridgeToggle({ action, setAction }: BridgeToggleProps) {
  return (
    <div className='flex flex-row justify-center items-center self-center w-72 rounded-full divide-x bg-white'>
      <div className='flex flex-row divide-x'>
        <button
          onClick={() => setAction('deposit')}
          className={`w-36 flex items-center justify-center h-12 rounded-l-full ${
            action === 'deposit' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setAction('withdraw')}
          className={`w-36 flex items-center justify-center h-12 ${
            action === 'withdraw' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
          }`}
        >
          Withdraw
        </button>
        <button
          onClick={() => setAction('prove')}
          className={`w-36 flex items-center justify-center h-12 ${
            action === 'prove' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
          }`}
        >
          Prove
        </button>
        <button
          onClick={() => setAction('finalize')}
          className={`w-36 flex items-center justify-center h-12 rounded-r-full ${
            action === 'finalize' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
          }`}
        >
          Finalize
        </button>
      </div>
    </div>
  )
}
