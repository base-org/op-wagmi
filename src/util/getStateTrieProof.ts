import { useEffect, useState } from 'react'
import type { PublicClient } from 'viem'

interface StateTrieProof {
  accountProof: string[]
  storageProof: `0x${string}`[]
  storageValue: bigint
  storageRoot: `0x${string}`
}

export async function makeStateTrieProof(
  client: PublicClient,
  blockNumber: bigint,
  address: `0x${string}`,
  slot: `0x${string}`,
): Promise<StateTrieProof> {
  const proof = await client.getProof({ address, storageKeys: [slot], blockNumber })

  return {
    accountProof: proof.accountProof,
    storageProof: proof.storageProof[0].proof,
    storageValue: proof.storageProof[0].value,
    storageRoot: proof.storageHash,
  }
}

export function useMakeStateTrieProof(
  client: PublicClient | undefined,
  blockNumber: bigint | undefined,
  address: `0x${string}`,
  slot: `0x${string}` | undefined,
) {
  const [proof, setProof] = useState<StateTrieProof | undefined>(undefined)

  useEffect(() => {
    if (!blockNumber || !slot || !client) {
      return undefined
    }

    const f = async () => {
      const proof = await makeStateTrieProof(client, blockNumber, address, slot)
      setProof(proof)
    }
    f()
    return
  }, [client, blockNumber, address, slot, setProof])

  return proof
}
