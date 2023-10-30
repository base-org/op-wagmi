import { useSimulateDepositETH } from 'op-wagmi'
import { useAccount } from 'wagmi'

const portal = '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'

export function SimulateDepositETH() {
  const { address } = useAccount()
  const { status, refetch: simulateDepositETH } = useSimulateDepositETH({
    args: {
      to: address,
      gasLimit: 100000,
    },
    portal,
    chainId: 5,
    value: BigInt(1),
    query: { enabled: false },
  })

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => simulateDepositETH()}
      >
        Simulate Deposit ETH
      </button>
      <div>{status}</div>
    </div>
  )
}
