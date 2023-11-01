import { useDisclosure } from '@/hooks/useDisclosure'
import { useSimulateWithdrawETH, useWriteWithdrawETH } from 'op-wagmi'
import { useState } from 'react'
import { Address, parseEther } from 'viem'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'
import { Modal } from './Modal'

type WithdrawETHModalProps = {
  isOpen: boolean
  onClose: () => void
}

function WithdrawETHModal({ isOpen, onClose }: WithdrawETHModalProps) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')
  const { status: simulateStatus, refetch: simulateWithdrawETH } = useSimulateWithdrawETH({
    args: {
      to: to as Address,
      amount: parseEther(amount),
      minGasLimit: 100000,
    },
    chainId: 84531,
    query: { enabled: false },
  })
  const { data, status: writeStatus, writeWithdrawETHAsync } = useWriteWithdrawETH()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateWithdrawETH()
    } else {
      try {
        await writeWithdrawETHAsync({
          args: {
            to: to as Address,
            amount: parseEther(amount),
            minGasLimit: 100000,
          },
          chainId: 84531,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col space-y-8 pb-8'>
        <span className='text-2xl font-bold text-white'>Withdraw ETH</span>
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
            {data && (
              <div className='flex flex-row justify-center space-x-8 items-center w-full'>
                <span className='text-white'>Transaction:</span>
                <a
                  className='text-blue-500 underline'
                  target='_blank'
                  rel='noreferrer'
                  href={`https://goerli.basescan.org/tx/${data}`}
                >
                  {`${data?.slice(0, 8)}...`}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}

export function WithdrawETH() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <div>
      {isOpen && <WithdrawETHModal isOpen={isOpen} onClose={onClose} />}
      <Button
        onClick={onOpen}
      >
        Withdraw ETH
      </Button>
    </div>
  )
}
