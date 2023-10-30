import { useSimulateWithdrawERC20 } from 'op-wagmi'
import { useAccount } from 'wagmi'

const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

export function SimulateWithdrawERC20() {
  const { address } = useAccount()
  const { status, refetch: simulateWithdrawERC20 } = useSimulateWithdrawERC20({
    args: {
      l2Token: cbETHL2,
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
        onClick={() => simulateWithdrawERC20()}
      >
        Simulate Withdraw ERC20
      </button>
      <div>{status}</div>
    </div>
  )
}
