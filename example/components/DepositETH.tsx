import { useDisclosure } from '@/hooks/useDisclosure'
// Just making the types work ignore
import { useState } from 'react'
import { Address, parseEther } from 'viem'
import { useSimulateDepositETH, useWriteDepositETH } from '../../src/index'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'
import { Modal } from './Modal'

// Just a heads up. We will be able to get these addresses (and abis) from the superchain repo in the future
// We have to publish it on npm first and also generate TS files from it
// OP-viem and op-wagmi would benifit from reexporting it. It will make it super easy to keep it up to date as new chains are added
// Since dependabot can just keep the dependency up to date.
// https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/configs/goerli/base.yaml
const portal = '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'

type DepositETHModalProps = {
  isOpen: boolean
  onClose: () => void
}

function DepositETHModal({ isOpen, onClose }: DepositETHModalProps) {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState<Action>('simulate')
  const { status: simulateStatus, refetch: simulateDepositETH } = useSimulateDepositETH({
    // I agree that I prefer this to be flatter than this with no args but I also think there is inherent value
    // in having fidelity with op-viem so I could go either way here
    args: {
      to: to as Address,
      gasLimit: 100000,
    },
    // I question if users know what portal means. Might be good to call it portalAddress?
    portal,
    chainId: 5,
    value: parseEther(amount),
    query: { enabled: false },
  })
  const { data, status: writeStatus, writeDepositETHAsync } = useWriteDepositETH()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateDepositETH()
    } else {
      try {
        await writeDepositETHAsync({
          args: {
            to: to as Address,
            gasLimit: 100000,
          },
          portal,
          chainId: 5,
          value: parseEther(amount),
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
            {data && (
              <div className='flex flex-row justify-center space-x-8 items-center w-full'>
                <span className='text-white'>Transaction:</span>
                <a
                  className='text-blue-500 underline'
                  target='_blank'
                  rel='noreferrer'
                  href={`https://goerli.etherscan.io/tx/${data}`}
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
