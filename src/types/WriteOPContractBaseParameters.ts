import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import type { Config } from 'wagmi'
import type { WriteContractVariables } from 'wagmi/query'

export type WriteOPContractBaseParameters<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = number,
  allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
> = Omit<
  WriteContractVariables<
    abi,
    functionName,
    ContractFunctionArgs<
      abi,
      'nonpayable' | 'payable',
      functionName
    >,
    config,
    chainId,
    allFunctionNames
  >,
  'abi' | 'functionName' | 'args' | 'chainId' | 'address' | 'type' | 'gasPrice' | 'account' | 'value'
>
