'use client'

import { ConnectButton } from '@/components/ConnectButton'
import { DepositERC20 } from '@/components/DepositERC20'
import { DepositETH } from '@/components/DepositETH'
import { WithdrawETH } from '@/components/WithdrawETH'
import { WithdrawERC20 } from '@/components/WriteWithdrawERC20'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (isClient && (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 space-y-16'>
      <span className='text-4xl font-bold text-white'>op-wagmi</span>
      <ConnectButton />
      <div className='flex flex-col space-y-6 items-center'>
        <DepositETH />
        <DepositERC20 />
        <WithdrawETH />
        <WithdrawERC20 />
      </div>
    </main>
  ))
}
