import localFont from 'next/font/local'
import './globals.css'
import { Metadata } from 'next'
import { Providers } from './providers'

const coinbaseSans = localFont({
  src: [
    {
      path: './CoinbaseSans.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'op-wagmi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={coinbaseSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
