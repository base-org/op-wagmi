import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import type { Config, ResolvedRegister, UseSimulateContractReturnType } from 'wagmi'
import type { SimulateContractData } from 'wagmi/query'

export type UseSimulateOPActionBaseReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<
    abi,
    functionName,
    ContractFunctionArgs<abi, 'payable' | 'nonpayable', functionName>,
    config,
    chainId
  >,
> = UseSimulateContractReturnType<
  abi,
  functionName,
  ContractFunctionArgs<abi, 'payable' | 'nonpayable', functionName>,
  config,
  chainId,
  selectData
>
