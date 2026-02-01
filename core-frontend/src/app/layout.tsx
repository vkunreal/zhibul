import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Footer, Header, Navbar } from '@/widgets/layout'

import styles from './layout.module.scss'
import '@/shared/styles/globals.scss'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'ZHBL',
  description: 'ZHBL',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body>
        <div className={styles.app}>
          <Header />
          <Navbar />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
