import { newsApi, NewsItem } from '@/entities/news'
import { getPage } from '@/shared/api'
import { Breadcrumbs, Wrapper } from '@/shared/ui'

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
  const newsList = await newsApi.getNews()

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
              <li key={item.id}>
                <NewsItem item={item} />
              </li>
            ))}
        </ul>
      </Wrapper>
    </>
  )
}
