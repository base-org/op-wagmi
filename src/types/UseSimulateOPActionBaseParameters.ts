import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import type { Config, ResolvedRegister, UseSimulateContractParameters } from 'wagmi'
import type { SimulateContractData } from 'wagmi/query'

export type UseSimulateOPActionBaseParameters<
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
> =
  & Omit<
    UseSimulateContractParameters<
      abi,
      functionName,
      ContractFunctionArgs<abi, 'payable' | 'nonpayable', functionName>,
      config,
      chainId,
      selectData
    >,
    'abi' | 'functionName' | 'args' | 'query' | 'address'
  >
  & {
    query?: { enabled?: boolean }
  }
