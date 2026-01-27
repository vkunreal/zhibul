import Image from 'next/image'
import Link from 'next/link'

import { getPage } from '@/shared/api'
import { getNews } from '@/shared/api/news'
import { Breadcrumbs, ButtonLink, Wrapper } from '@/shared/ui'
import { getDate } from '@/shared/utils'

import styles from './styles.module.scss'

const PAGE = 'news'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Новости',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function NewsList() {
  const newsList = await getNews()

  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Новости"
      />

      <Wrapper className={styles.wrapper}>
        <ul className={styles.list}>
          {!!newsList.length &&
            newsList.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={item.media[0].src}
                    alt="image"
                    fill
                  />
                </div>

                <div className={styles.content}>
                  <div className={styles.info}>
                    <h2 className={styles.title}>
                      <Link href={`/news/${item.url}`}>{item.title}</Link>
                    </h2>

                    <time className={styles.time}>{getDate(item.date)}</time>

                    <p
                      className={styles.description}
                      dangerouslySetInnerHTML={{ __html: item.short_text }}
                    />
                  </div>

                  <div>
                    <ButtonLink
                      href={`/news/${item.url}`}
                      size="small"
                      uppercase
                    >
                      Подробнее
                    </ButtonLink>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </Wrapper>
    </>
  )
}
