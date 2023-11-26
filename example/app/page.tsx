'use client'

import { BridgeToggle } from '@/components/BridgeToggle'
import { ConnectButton } from '@/components/ConnectButton'
import { DepositContainer } from '@/components/DepositContainer'
import { FinalizeContainer } from '@/components/FinalizeContainer'
import { ProveContainer } from '@/components/ProveContainer'
import { WithdrawContainer } from '@/components/WithdrawContainer'
import { useState } from 'react'

export default function Home() {
  const [action, setAction] = useState<'deposit' | 'withdraw' | 'prove' | 'finalize'>('deposit')

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 space-y-16'>
      <span className='text-4xl font-bold text-white'>🔴🔵 Superchain Bridge 🔵🔴</span>
      <ConnectButton />
      <div className='flex flex-col justify-start items-center space-y-8 w-full shadow-lg shadow-white rounded-lg py-16 pt-8 px-4'>
        <BridgeToggle action={action} setAction={setAction} />
        {action === 'deposit' && <DepositContainer />}
        {action === 'withdraw' && <WithdrawContainer />}
        {action === 'prove' && <ProveContainer />}
        {action === 'finalize' && <FinalizeContainer />}
      </div>
    </main>
  )
}
