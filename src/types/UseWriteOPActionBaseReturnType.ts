import type { MutateOptions } from '@tanstack/react-query'
import type { WriteContractErrorType, WriteContractReturnType } from '@wagmi/core'
import type { Abi } from 'viem'
import type { Config, UseWriteContractReturnType } from 'wagmi'
import type { WriteContractData, WriteContractVariables } from 'wagmi/query'

export type UseWriteOPActionBaseReturnType<
  args,
  config extends Config = Config,
  context = unknown,
> =
  & Omit<UseWriteContractReturnType<config, context>, 'writeContract' | 'writeContractAsync'>
  & {
    write: (
      args: args,
      options?:
        | MutateOptions<
          WriteContractData,
          WriteContractErrorType,
          WriteContractVariables<
            Abi,
            string,
            readonly unknown[],
            config,
            config['chains'][number]['id']
          >,
          context
        >
        | undefined,
    ) => void
    writeAsync: (
      args: args,
      options?:
        | MutateOptions<
          WriteContractData,
          WriteContractErrorType,
          WriteContractVariables<
            Abi,
            string,
            readonly unknown[],
            config,
            config['chains'][number]['id']
          >,
          context
        >
        | undefined,
    ) => Promise<WriteContractReturnType>
  }
