export function L2ChainNotConfiguredMessage(l2ChainId: number) {
  return `L2 chain with id '${l2ChainId}' is not configured, make sure to add it to your chains array. https://wagmi.sh/core/api/createConfig`
}

export function L2ChainMissingSourceChainMessage(l2ChainName: string) {
  return `Chain ${l2ChainName} does not have a source chain, is it an L2 chain?`
}

export function PortalContractNotConfiguredMessage(l1ChainId: number, l2ChainName: string) {
  return `Portal contract to chainId ${l1ChainId} not configured for chain ${l2ChainName}`
}

export function l2OutputOracleContractNotConfiguredMessage(l2ChainName: string) {
  return `L2 output oracle contract not configured for chain ${l2ChainName}`
}
