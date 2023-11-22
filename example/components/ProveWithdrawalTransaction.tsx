import { useSimulateProveWithdrawalTransaction, useWriteProveWithdrawalTransaction } from 'op-wagmi'
import { useState } from 'react'
import { Hash } from 'viem'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'

type ProveWithdrawalTransactionProps = {
  selectedChainId: number
}

export function ProveWithdrawalTransaction({ selectedChainId }: ProveWithdrawalTransactionProps) {
  const [withdrawalTxHash, setWithdrawalTxHash] = useState('')
  const [action, setAction] = useState<Action>('simulate')

  const { status: simulateStatus, refetch: simulateProveWithdrawalTransaction } = useSimulateProveWithdrawalTransaction(
    {
      args: {
        l1WithdrawalTxHash: withdrawalTxHash as Hash,
      },
      l2ChainId: selectedChainId,
      query: { enabled: false, retry: false },
    },
  )

  const { data: l1TxHash, status: writeStatus, writeProveWithdrawalTransactionAsync } =
    useWriteProveWithdrawalTransaction()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateProveWithdrawalTransaction()
    } else {
      await writeProveWithdrawalTransactionAsync({
        args: {
          l1WithdrawalTxHash: withdrawalTxHash as Hash,
        },
        l2ChainId: selectedChainId,
      })
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col w-full px-16 space-y-4'>
        <InputGroup
          label='Withdrawal Tx Hash'
          placeholder='0x...'
          value={withdrawalTxHash}
          setValue={setWithdrawalTxHash}
        />
        <ActionToggle action={action} setAction={setAction} />
        <div className='self-center'>
          <Button onClick={handleClick}>
            {`🚀 ${action === 'simulate' ? 'Simulate' : 'Write'} Prove Withdrawal 🚀`}
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
        </div>
      )}
    </div>
  )
}
