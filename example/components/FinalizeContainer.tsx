import { networkToChainId } from '@/constants/networkToChainId'
import { useSelectedNetwork } from '@/hooks/useSelectedNetwork'
import { FinalizeWithdrawalTransaction } from './FinalizeWithdrawalTransaction'
import { NetworkSelector } from './NetworkSelector'

export function FinalizeContainer() {
  const { selectedNetwork, setSelectedNetwork } = useSelectedNetwork('baseSepolia')
  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      <span className='text-white'>From</span>
      <NetworkSelector selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
      <FinalizeWithdrawalTransaction selectedChainId={networkToChainId[selectedNetwork]} />
    </div>
  )
}
