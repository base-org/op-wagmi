import { useSimulateWithdrawETH } from 'op-wagmi'
import { useAccount } from 'wagmi'

export function SimulateWithdrawETH() {
  const { address } = useAccount()
  const { status, refetch: simulateWithdrawETH } = useSimulateWithdrawETH({
    args: {
      to: address,
      amount: BigInt(1),
      minGasLimit: 100000,
    },
    chainId: 84531,
    query: { enabled: false },
  })

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => simulateWithdrawETH()}
      >
        Simulate Withdraw ETH
      </button>
      <div>{status}</div>
    </div>
  )
}
