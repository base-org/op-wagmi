export type BedrockCrossChainMessageProof = {
  l2OutputIndex: bigint
  outputRootProof: {
    version: `0x${string}`
    stateRoot: `0x${string}`
    messagePasserStorageRoot: `0x${string}`
    latestBlockhash: `0x${string}`
  }
  withdrawalProof: `0x${string}`[]
}
