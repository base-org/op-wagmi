'use client'

import { ConnectButton } from '@/components/ConnectButton'
import { SimulateDepositERC20 } from '@/components/SimulateDepositERC20'
import { SimulateDepositETH } from '@/components/SimulateDepositETH'
import { SimulateWithdrawERC20 } from '@/components/SimulateWithdrawERC20'
import { SimulateWithdrawETH } from '@/components/SimulateWithdrawETH'
import { WriteDepositERC20 } from '@/components/WriteDepositERC20'
import { WriteDepositETH } from '@/components/WriteDepositETH'
import { WriteWithdrawERC20 } from '@/components/WriteWithdrawERC20'
import { WriteWithdrawETH } from '@/components/WriteWithdrawETH'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (isClient && (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 space-y-16 w-screen'>
      <ConnectButton />
      <div className='flex flex-row justify-around'>
        <div className='flex flex-col space-y-16'>
          <SimulateDepositERC20 />
          <SimulateDepositETH />
          <SimulateWithdrawETH />
          <SimulateWithdrawERC20 />
        </div>
        <div className='flex flex-col space-y-16'>
          <WriteDepositERC20 />
          <WriteDepositETH />
          <WriteWithdrawETH />
          <WriteWithdrawERC20 />
        </div>
      </div>
    </main>
  ))
}
