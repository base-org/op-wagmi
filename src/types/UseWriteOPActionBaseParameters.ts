import type { Config, UseWriteContractParameters } from 'wagmi'

export type UseWriteOPActionBaseParameters<
  args extends { chainId?: number },
  config extends Config = Config,
  context = unknown,
> =
  & Omit<
    UseWriteContractParameters<
      config,
      context
    >,
    'mutation'
  >
  & {
    mutation?: Omit<UseWriteContractParameters<config, context>['mutation'], 'onMutate'> & {
      onMutate?:
        | ((
          args: args,
        ) => Promise<context | void> | context | void)
        | undefined
    }
  }
