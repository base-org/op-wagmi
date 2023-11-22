import { useSimulateDepositERC20, useWriteDepositERC20 } from 'op-wagmi'
import { useState } from 'react'
import { Address, erc20Abi, isAddress, parseUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'

const cbETHL1 = '0xD0bb78d0B337aA6D3A0530DD2e58560bf00851f1'
const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

type DepositERC20Props = {
  selectedChainId: number
}

export function DepositERC20({ selectedChainId }: DepositERC20Props) {
  const [l1Token, setL1Token] = useState(cbETHL1)
  const [l2Token, setL2Token] = useState(cbETHL2)
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')
  const { data: tokenDecimals } = useReadContract({
    address: l1Token as Address,
    abi: erc20Abi,
    functionName: 'decimals',
    chainId: 5,
    query: { enabled: isAddress(l1Token) },
  })

  const { status: simulateStatus, refetch: simulateDepositERC20 } = useSimulateDepositERC20({
    args: {
      l1Token: l1Token as Address,
      l2Token: l2Token as Address,
      to: to as Address,
      amount: parseUnits(amount, tokenDecimals ?? 18),
    },
    l2ChainId: selectedChainId,
    query: { enabled: false, retry: false },
  })
  const { data: l1TxHash, status: writeStatus, writeDepositERC20Async } = useWriteDepositERC20()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateDepositERC20()
    } else {
      await writeDepositERC20Async({
        args: {
          l1Token: l1Token as Address,
          l2Token: l2Token as Address,
          to: to as Address,
          amount: parseUnits(amount, tokenDecimals ?? 18),
        },
        l2ChainId: selectedChainId,
      })
    }
  }

  return (
    <div className='flex flex-col space-y-4 pb-8'>
      <div className='flex flex-col w-full px-16 space-y-4'>
        <InputGroup
          label='L1 Token:'
          placeholder='0x...'
          value={l1Token}
          setValue={setL1Token}
        />
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
            {`🚀 ${action === 'simulate' ? 'Simulate' : 'Write'} Deposit ERC20 🚀`}
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
