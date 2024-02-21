export const poolId = Number(process.env.VITEST_POOL_ID ?? 1)
export const localHttpUrl = `http://127.0.0.1:8545/${poolId}`
export const localWsUrl = `ws://127.0.0.1:8545/${poolId}`
export const localRollupHttpUrl = `http://127.0.0.1:8546/${poolId}`
export const localRollupWsUrl = `ws://127.0.0.1:8546/${poolId}`
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      outputFile: './bench/report.json',
      reporters: process.env.CI ? ['json'] : ['verbose'],
    },
    // if you are using the default rpc you will need these to not get rate limited
    // maxConcurrency: 1,
    // maxThreads: 1,
    // minThreads: 1,
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: [
        '**/errors/utils.ts',
        '**/dist/**',
        '**/*.test.ts',
        '**/_test/**',
      ],
    },
    environment: 'happy-dom',
    globalSetup: ['./src/_test/globalSetup.ts'],
    setupFiles: ['./src/_test/setup.ts'],
    testTimeout: 100_000,
    pool: 'forks',
  },
})
