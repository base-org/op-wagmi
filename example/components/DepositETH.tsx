import { useDisclosure } from '@/hooks/useDisclosure'
import { useSimulateDepositETH, useWriteDepositETH } from 'op-wagmi'
import { useState } from 'react'
import { Address, parseEther } from 'viem'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'
import { Modal } from './Modal'

type DepositETHModalProps = {
  isOpen: boolean
  onClose: () => void
}

function DepositETHModal({ isOpen, onClose }: DepositETHModalProps) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')
  const { status: simulateStatus, refetch: simulateDepositETH } = useSimulateDepositETH({
    args: {
      to: to as Address,
      gasLimit: 100000,
      amount: parseEther(amount),
    },
    l2ChainId: 84531,
    query: { enabled: false },
  })
  const { data: l1TxHash, l2TxHash, status: writeStatus, writeDepositETHAsync } = useWriteDepositETH({
    l2ChainId: 84531,
  })

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateDepositETH()
    } else {
      try {
        await writeDepositETHAsync({
          args: {
            to: to as Address,
            gasLimit: 100000,
            amount: parseEther(amount),
          },
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col space-y-8 pb-8'>
        <span className='text-2xl font-bold text-white'>Deposit ETH</span>
        <div className='flex flex-col w-full px-16 space-y-4'>
          <InputGroup label='To' placeholder='0x...' value={to} setValue={setTo} />
          <InputGroup label='Amount' value={amount} setValue={setAmount} />
          <ActionToggle action={action} setAction={setAction} />
          <div className='self-center'>
            <Button onClick={handleClick}>{`🚀 ${action === 'simulate' ? 'Simulate' : 'Write'} Deposit ETH 🚀`}</Button>
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
            {l1TxHash && (
              <div className='flex flex-row justify-center space-x-8 items-center w-full'>
                <span className='text-white'>L1 Tx:</span>
                <a
                  className='text-blue-500 underline'
                  target='_blank'
                  rel='noreferrer'
                  href={`https://goerli.etherscan.io/tx/${l1TxHash}`}
                >
                  {`${l1TxHash?.slice(0, 8)}...`}
                </a>
              </div>
            )}
            {l2TxHash && (
              <div className='flex flex-row justify-center space-x-8 items-center w-full'>
                <span className='text-white'>L2 Tx:</span>
                <a
                  className='text-blue-500 underline'
                  target='_blank'
                  rel='noreferrer'
                  href={`https://goerli.basescan.org/tx/${l2TxHash}`}
                >
                  {`${l2TxHash?.slice(0, 8)}...`}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}

export function DepositETH() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <div>
      {isOpen && <DepositETHModal isOpen={isOpen} onClose={onClose} />}
      <Button
        onClick={onOpen}
      >
        Deposit ETH
      </Button>
    </div>
  )
}
