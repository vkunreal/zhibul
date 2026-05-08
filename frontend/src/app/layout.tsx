import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Script from 'next/script'

import { ModalProvider } from '@/core/providers'
import { ScrollToTop } from '@/features/scrollToTop'
import { SwipeUpButton } from '@/features/swipePageUp'
import { roboto } from '@/shared/assets'
import { Footer, Header, Navbar } from '@/widgets/layout'

import styles from './layout.module.scss'
import '@/core/styles/globals.scss'

export const metadata: Metadata = {
  title: 'ZHBL',
  description: 'ZHBL',
}

const METRIKA_ID = Number(process.env.NEXT_PUBLIC_METRIKA_ID)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={roboto.variable}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <head>
        <Script
          id="bitrix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                  (function (w, d, u) {
                    var s = d.createElement("script");
                    s.async = true;
                    s.src = u + "?" + ((Date.now() / 60000) | 0);
                    var h = d.getElementsByTagName("script")[0];
                    h.parentNode.insertBefore(s, h);
                  })(
                    window,
                    document,
                    "https://cdn-ru.bitrix24.by/b28268456/crm/site_button/loader_1_qhf2vf.js"
                  );
                  `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {
                      if (document.scripts[j].src === r) { return; }
                    }
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(${METRIKA_ID}, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                    });
                    `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body>
        <ModalProvider>
          <ScrollToTop />
          <SwipeUpButton />
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
