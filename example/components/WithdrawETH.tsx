import { chainIdToExplorer } from '@/constants/chainIdToExplorer'
import { useSimulateWithdrawETH, useWriteWithdrawETH } from 'op-wagmi'
import { useState } from 'react'
import { Address, parseEther } from 'viem'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'

type WithdrawETHProps = {
  selectedChainId: number
}

export function WithdrawETH({ selectedChainId }: WithdrawETHProps) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')

  const { status: simulateStatus, refetch: simulateWithdrawETH } = useSimulateWithdrawETH({
    args: {
      to: to as Address,
      amount: parseEther(amount),
    },
    chainId: selectedChainId,
    query: { enabled: false, retry: false },
  })
  const { data: l2TxHash, status: writeStatus, writeWithdrawETHAsync } = useWriteWithdrawETH()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateWithdrawETH()
    } else {
      await writeWithdrawETHAsync({
        args: {
          to: to as Address,

          amount: parseEther(amount),
        },
        chainId: selectedChainId,
      })
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col w-full px-16 space-y-4'>
        <InputGroup label='To' placeholder='0x...' value={to} setValue={setTo} />
        <InputGroup label='Amount' value={amount} setValue={setAmount} />
        <ActionToggle action={action} setAction={setAction} />
        <div className='self-center'>
          <Button onClick={handleClick}>
            {`🚀 ${action === 'simulate' ? 'Simulate' : 'Write'} Withdraw ETH 🚀`}
          </Button>
        </div>
      </div>
      {action === 'simulate' && simulateStatus && (
        <div className='flex flex-col w-full px-16 space-y-4'>
          <div className='flex flex-row justify-center space-x-8 items-center w-full'>
            <span className='text-white'>Status:</span>
            <span className='text-white'>{simulateStatus}</span>
          </div>
        </div>
      )}
      {action === 'write' && writeStatus && (
        <div className='flex flex-col w-full px-16 space-y-4'>
          <div className='flex flex-row justify-center space-x-8 items-center w-full'>
            <span className='text-white'>Status:</span>
            <span className='text-white'>{writeStatus}</span>
          </div>
          {l2TxHash && (
            <div className='flex flex-row justify-center space-x-8 items-center w-full'>
              <span className='text-white'>L2 Tx:</span>
              <a
                className='text-blue-500 underline'
                target='_blank'
                rel='noreferrer'
                href={`${chainIdToExplorer[selectedChainId]}/tx/${l2TxHash}`}
              >
                {`${l2TxHash?.slice(0, 8)}...`}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
