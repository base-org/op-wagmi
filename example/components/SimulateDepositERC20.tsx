import { useSimulateDepositERC20 } from 'op-wagmi'
import { useAccount } from 'wagmi'

const l1StandardBridge = '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
const cbETHL1 = '0xD0bb78d0B337aA6D3A0530DD2e58560bf00851f1'
const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

export function SimulateDepositERC20() {
  const { address } = useAccount()
  const { status, refetch: simulateDepositERC20 } = useSimulateDepositERC20({
    args: {
      l1Token: cbETHL1,
      l2Token: cbETHL2,
      to: address,
      amount: BigInt(1),
      minGasLimit: 100000,
    },
    l1StandardBridge,
    chainId: 5,
    query: { enabled: false },
  })

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => simulateDepositERC20()}
      >
        Simulate Deposit ERC20
      </button>
      <div>{status}</div>
    </div>
  )
}
