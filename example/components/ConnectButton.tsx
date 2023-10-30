'use client'

import { useAccount, useConnect } from 'wagmi'

export function ConnectButton() {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()

  return (
    <>
      {address ? <span>{address}</span> : (
        connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {connector.name}
          </button>
        ))
      )}
    </>
  )
}
