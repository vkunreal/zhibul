import type { Metadata } from 'next'

import { ModalProvider } from '@/core/providers'
import { roboto } from '@/shared/assets'
import { Footer, Header, Navbar } from '@/widgets/layout'

import styles from './layout.module.scss'
import '@/core/styles/globals.scss'

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
        <ModalProvider>
          <div className={styles.app}>
            <Header />
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </ModalProvider>
      </body>
    </html>
  )
}
