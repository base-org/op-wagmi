import { useWriteWithdrawERC20 } from 'op-wagmi'
import { useAccount } from 'wagmi'

const cbETHL2 = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2'

export function WriteWithdrawERC20() {
  const { address } = useAccount()
  const { data, status, writeWithdrawERC20 } = useWriteWithdrawERC20()

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() =>
          writeWithdrawERC20({
            args: {
              l2Token: cbETHL2,
              to: address,
              amount: BigInt(1),
              minGasLimit: 100000,
            },
            chainId: 84531,
          })}
      >
        Write Withdraw ERC20
      </button>
      <div className='flex flex-col space-y-2'>
        <span>{status}</span>
        {data && (
          <a target='_blank' rel='noreferrer' href={`https://goerli.basescan.org/tx/${data}`}>
            {`${data?.slice(0, 8)}...`}
          </a>
        )}
      </div>
    </div>
  )
}
