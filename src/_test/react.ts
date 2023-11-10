import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  renderHook as rtl_renderHook,
  type RenderHookOptions,
  type RenderHookResult,
  waitFor as rtl_waitFor,
  type waitForOptions,
} from '@testing-library/react'
import { createElement } from 'react'
import { WagmiProvider } from 'wagmi'
export { act, cleanup } from '@testing-library/react'

import { config } from './config.js'

export const queryClient = new QueryClient()

export function createWrapper<TComponent extends React.FunctionComponent<any>>(
  Wrapper: TComponent,
  props: Parameters<TComponent>[0],
) {
  type Props = { children?: React.ReactNode | undefined }
  return function CreatedWrapper({ children }: Props) {
    return createElement(
      Wrapper,
      props,
      createElement(QueryClientProvider, { client: queryClient }, children),
    )
  }
}

export function renderHook<Result, Props>(
  render: (props: Props) => Result,
  options?: RenderHookOptions<Props> | undefined,
): RenderHookResult<Result, Props> {
  queryClient.clear()
  return rtl_renderHook(render, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function waitFor<T>(
  callback: () => Promise<T> | T,
  options?: waitForOptions | undefined,
): Promise<T> {
  return rtl_waitFor(callback, { timeout: 10_000, ...options })
}
