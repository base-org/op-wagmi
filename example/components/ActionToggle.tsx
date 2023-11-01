export type Action = 'simulate' | 'write'

type ActionToggleProps = {
  action: Action
  setAction: (action: Action) => void
}

export function ActionToggle({ action, setAction }: ActionToggleProps) {
  return (
    <div className='flex flex-row justify-center items-center self-center w-64 rounded-full divide-x bg-white'>
      <button
        className={`w-32 flex items-center justify-center h-12 rounded-l-full ${
          action === 'simulate' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
        }`}
        onClick={() => setAction('simulate')}
      >
        Simulate
      </button>
      <button
        className={`w-32 flex items-center justify-center h-12 rounded-r-full ${
          action === 'write' ? 'bg-blue-500 text-white shadow-inner shadow-stone-900' : 'bg-white text-black'
        }`}
        onClick={() => setAction('write')}
      >
        Write
      </button>
    </div>
  )
}
