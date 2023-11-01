'use client'

import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from './Button'

export function ConnectButton() {
  const { address } = useAccount()
  const { connect } = useConnect()

  return (
    <>
      {address ? <span>{address}</span> : (
        <Button
          onClick={() => connect({ connector: injected() })}
        >
          Connect
        </Button>
      )}
    </>
  )
}
