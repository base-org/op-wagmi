import { useWriteDepositETH } from 'op-wagmi'
import { useAccount } from 'wagmi'

const portal = '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'

export function WriteDepositETH() {
  const { address } = useAccount()
  const { data, status, writeDepositETH } = useWriteDepositETH()

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() =>
          writeDepositETH({
            args: {
              to: address,
              gasLimit: 100000,
            },
            portal,
            value: BigInt(1),
            chainId: 5,
          })}
      >
        Write Deposit ETH
      </button>
      <div className='flex flex-col space-y-2'>
        <span>{status}</span>
        {data && (
          <a target='_blank' rel='noreferrer' href={`https://goerli.etherscan.io/tx/${data}`}>
            {`${data?.slice(0, 8)}...`}
          </a>
        )}
      </div>
    </div>
  )
}
