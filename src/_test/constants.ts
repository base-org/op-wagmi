/**
 * The id of the current test worker.
 *
 * This is used by the anvil proxy to route requests to the correct anvil instance.
 */
export const pool = Number(process.env.VITEST_POOL_ID ?? 1)

// Test accounts
export const accounts = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'] as const

const messages = new Map()
function warn(message: string) {
  if (!messages.has(message)) {
    messages.set(message, true)
    console.warn(message)
  }
}

// export let forkBlockNumber: bigint
// if (process.env.VITE_ANVIL_BLOCK_NUMBER) {
//   forkBlockNumber = BigInt(Number(process.env.VITE_ANVIL_BLOCK_NUMBER))
// } else {
//   forkBlockNumber = 18136086n
//   warn(
//     `\`VITE_ANVIL_BLOCK_NUMBER\` not found. Falling back to \`${forkBlockNumber}\`.`,
//   )
// }

export let forkUrl: string
if (process.env.VITE_ANVIL_FORK_URL) {
  forkUrl = process.env.VITE_ANVIL_FORK_URL
} else {
  forkUrl = 'https://cloudflare-eth.com'
  warn(`\`VITE_ANVIL_FORK_URL\` not found. Falling back to \`${forkUrl}\`.`)
}

export let blockTime: number
if (process.env.VITE_ANVIL_BLOCK_TIME) {
  blockTime = Number(process.env.VITE_ANVIL_BLOCK_TIME)
} else {
  blockTime = 1
  warn(`\`VITE_ANVIL_BLOCK_TIME\` not found. Falling back to \`${blockTime}\`.`)
}

// export let rollupForkBlockNumber: bigint
// if (process.env.VITE_ANVIL_ROLLUP_BLOCK_NUMBER) {
//   rollupForkBlockNumber = BigInt(
//     Number(process.env.VITE_ANVIL_ROLLUP_BLOCK_NUMBER),
//   )
// } else {
//   rollupForkBlockNumber = 3709321n
//   warn(
//     `\`VITE_ANVIL_ROLLUP_BLOCK_NUMBER\` not found. Falling back to \`${rollupForkBlockNumber}\`.`,
//   )
// }

export let rollupForkUrl: string
if (process.env.VITE_ANVIL_ROLLUP_FORK_URL) {
  rollupForkUrl = process.env.VITE_ANVIL_ROLLUP_FORK_URL
} else {
  rollupForkUrl = 'https://mainnet.base.org'
  warn(
    `\`VITE_ANVIL_ROLLUP_FORK_URL\` not found. Falling back to \`${rollupForkUrl}\`.`,
  )
}

export let rollupBlockTime: number
if (process.env.VITE_ANVIL_ROLLUP_BLOCK_TIME) {
  rollupBlockTime = Number(process.env.VITE_ANVIL_ROLLUP_BLOCK_TIME)
} else {
  rollupBlockTime = 1
  warn(
    `\`VITE_ANVIL_ROLLUP_BLOCK_TIME\` not found. Falling back to \`${rollupBlockTime}\`.`,
  )
}
