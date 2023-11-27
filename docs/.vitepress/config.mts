import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OP Wagmi',
  description: 'Wagmi hooks for the OP Stack',
  // TODO remove
  ignoreDeadLinks: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
    ],
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/' },
          { text: 'Configuration', link: '/docs/configuration' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          {
            text: 'L1',
            items: [
              {
                text: 'useSimulateDepositETH',
                link: '/docs/hooks/L1/useSimulateDepositETH',
              },
              {
                text: 'useWriteDepositETH',
                link: '/docs/hooks/L1/useWriteDepositETH',
              },
              {
                text: 'useSimulateDepositERC20',
                link: '/docs/hooks/L1/useSimulateDepositERC20',
              },
              {
                text: 'useWriteDepositERC20',
                link: '/docs/hooks/L1/useWriteDepositERC20',
              },
              {
                text: 'useSimulateProveWithdrawalTransaction',
                link: '/docs/hooks/L1/useSimulateProveWithdrawalTransaction',
              },
              {
                text: 'useWriteProveWithdrawalTransaction',
                link: '/docs/hooks/L1/useWriteProveWithdrawalTransaction',
              },
              {
                text: 'useSimulateFinalizeWithdrawalTransaction',
                link: '/docs/hooks/L1/useSimulateFinalizeWithdrawalTransaction',
              },
              {
                text: 'useWriteFinalizeWithdrawalTransaction',
                link: '/docs/hooks/L1/useWriteFinalizeWithdrawalTransaction',
              },
            ],
          },
          {
            text: 'L2',
            items: [
              {
                text: 'useSimulateWithdrawETH',
                link: '/docs/hooks/L2/useSimulateWithdrawETH',
              },
              {
                text: 'useWriteWithdrawETH',
                link: '/docs/hooks/L2/useWriteWithdrawETH',
              },
              {
                text: 'useSimulateWithdrawERC20',
                link: '/docs/hooks/L2/useSimulateWithdrawERC20',
              },
              {
                text: 'useWriteWithdrawERC20',
                link: '/docs/hooks/L2/useWriteWithdrawERC20',
              },
            ],
          },
        ],
      },
      {
        text: 'Glossary',
        items: [
          { text: 'Types', link: '/reference/modules' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/base-org/op-wagmi' },
    ],
  },
})
