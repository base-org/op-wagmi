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
          { text: 'Examples', link: '/docs/examples' },
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
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/base-org/op-wagmi' },
    ],
  },
})
