import { useWriteWithdrawETH } from 'op-wagmi'
import { useAccount } from 'wagmi'

export function WriteWithdrawETH() {
  const { address } = useAccount()
  const { data, status, writeWithdrawETH } = useWriteWithdrawETH()

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() =>
          writeWithdrawETH({
            args: {
              to: address,
              amount: BigInt(1),
              minGasLimit: 100000,
            },
            chainId: 84531,
          })}
      >
        Write Withdraw ETH
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
