import { useSimulateDepositETH, useWriteDepositETH } from 'op-wagmi'
import { useState } from 'react'
import { Address, parseEther } from 'viem'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'

const chainIdToExplorer: Record<number, string> = {
  84531: 'https://goerli.basescan.org/',
  420: 'https://goerli-optimism.etherscan.io/',
}

type DepositETHProps = {
  selectedChainId: number
}

export function DepositETH({ selectedChainId }: DepositETHProps) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')

  const { status: simulateStatus, refetch: simulateDepositETH } = useSimulateDepositETH({
    args: {
      to: to as Address,
      gasLimit: 100000,
      amount: parseEther(amount),
    },
    l2ChainId: selectedChainId,
    query: { enabled: false, retry: false },
  })
  const { data: l1TxHash, l2TxHash, status: writeStatus, writeDepositETHAsync } = useWriteDepositETH({
    l2ChainId: selectedChainId,
  })

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateDepositETH()
    } else {
      await writeDepositETHAsync({
        args: {
          to: to as Address,
          gasLimit: 100000,
          amount: parseEther(amount),
        },
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
