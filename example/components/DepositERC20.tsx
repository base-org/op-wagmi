import { useDisclosure } from '@/hooks/useDisclosure'
import { useSimulateDepositERC20, useWriteDepositERC20 } from 'op-wagmi'
import { useState } from 'react'
import { Address, erc20Abi, isAddress, parseUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { Action, ActionToggle } from './ActionToggle'
import { Button } from './Button'
import { InputGroup } from './InputGroup'
import { Modal } from './Modal'

const l1StandardBridge = '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
const cbETHL1 = '0xD0bb78d0B337aA6D3A0530DD2e58560bf00851f1'
const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

type DepositERC20ModalProps = {
  isOpen: boolean
  onClose: () => void
}

function DepositERC20Modal({ isOpen, onClose }: DepositERC20ModalProps) {
  // Just a note: we could get the l2 token from the l1 token if it's an OP token
  // This is an API we could definitely consider adding to op-viem and op-wagmi
  // Could look something like this:
  // const {data: {l1TokenAddress, bridgeAddress}} = useGetTokenInfo({l2TokenAddress})
  // Seems not high priority though
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
      minGasLimit: 100000,
    },
    l1StandardBridge,
    chainId: 5,
    query: { enabled: false },
  })
  const { data, status: writeStatus, writeDepositERC20Async } = useWriteDepositERC20()

  const handleClick = async () => {
    if (action === 'simulate') {
      simulateDepositERC20()
    } else {
      try {
        await writeDepositERC20Async({
          args: {
            l1Token: l1Token as Address,
            l2Token: l2Token as Address,
            to: to as Address,
            amount: BigInt(1),
            minGasLimit: 100000,
          },
          l1StandardBridge,
          chainId: 5,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col space-y-8 pb-8'>
        <span className='text-2xl font-bold text-white'>Deposit ERC20</span>
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

export function DepositERC20() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <div>
      {isOpen && <DepositERC20Modal isOpen={isOpen} onClose={onClose} />}
      <Button
        onClick={onOpen}
      >
        Deposit ERC20
      </Button>
    </div>
  )
}
