import { chainIdToExplorer } from '@/constants/chainIdToExplorer'
import { useSimulateWithdrawERC20, useWriteWithdrawERC20 } from 'op-wagmi'
import { useState } from 'react'
import { Address, erc20Abi, isAddress, parseUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'

const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

type WithdrawERC20Props = {
  selectedChainId: number
}

export function WithdrawERC20({ selectedChainId }: WithdrawERC20Props) {
  const [to, setTo] = useState('')
  const [l2Token, setL2Token] = useState(cbETHL2)
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')
  const { data: tokenDecimals } = useReadContract({
    address: l2Token as Address,
    abi: erc20Abi,
    functionName: 'decimals',
    chainId: 5,
    query: { enabled: isAddress(l2Token) },
  })

  const { status: simulateStatus, refetch: simulateWithdrawERC20 } = useSimulateWithdrawERC20({
    args: {
      l2Token: l2Token as Address,
      to: to as Address,
      amount: parseUnits(amount, tokenDecimals ?? 18),
    },
    chainId: selectedChainId,
    query: { enabled: false, retry: false },
  })
  const { data: l2TxHash, status: writeStatus, writeWithdrawERC20Async } = useWriteWithdrawERC20()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateWithdrawERC20()
    } else {
      await writeWithdrawERC20Async({
        args: {
          l2Token: l2Token as Address,
          to: to as Address,

          amount: parseUnits(amount, tokenDecimals ?? 18),
        },
        chainId: selectedChainId,
      })
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col w-full px-16 space-y-4'>
        <InputGroup
          label='L2 Token:'
          placeholder='0x...'
          value={l2Token}
          setValue={setL2Token}
        />
        <InputGroup label='To' placeholder='0x...' value={to} setValue={setTo} />
        <InputGroup label='Amount' value={amount} setValue={setAmount} />
        <ActionToggle action={action} setAction={setAction} />
        <div className='self-center'>
          <Button onClick={handleClick}>
            {`🚀 ${action === 'simulate' ? 'Simulate' : 'Write'} Withdraw ERC20 🚀`}
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
