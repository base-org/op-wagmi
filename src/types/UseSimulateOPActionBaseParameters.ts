import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import type { Config, UseSimulateContractParameters } from 'wagmi'
import type { SimulateContractData } from 'wagmi/query'
import type { ConfigParameter } from '../hooks/useOpConfig.js'
import type { OpConfig } from './OpConfig.js'

export type UseSimulateOPActionBaseParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  config extends Config = OpConfig,
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
    | 'value'
    | 'type'
    | 'gasPrice'
    | 'blockNumber'
    | 'address'
    | 'abi'
    | 'functionName'
    | 'args'
    | 'chainId'
    | 'config'
    | 'query'
  >
  & ConfigParameter<config>
