import { notFound } from 'next/navigation'

import { newsApi } from '@/entities/news'
import { Breadcrumbs, Wrapper } from '@/shared/ui'
import { Feedback } from '@/widgets'

import styles from './styles.module.scss'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ news_slug: string }>
}) {
  const { news_slug } = await params
  const newsItem = await newsApi.getNewsItem(news_slug)

  return {
    title: newsItem?.seo_title ?? 'Новости',
    description: newsItem?.seo_description ?? '',
    keywords: newsItem?.seo_keywords ?? '',
  }
}

export default async function NewsList({
  params,
}: {
  params: Promise<{ news_slug: string }>
}) {
  const { news_slug } = await params
  const newsItem = await newsApi.getNewsItem(news_slug)

  if (!newsItem) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/', title: 'Главная' },
          { url: '/news/', title: 'Новости' },
        ]}
        activeTitle={newsItem.title}
      />

      <Wrapper className={styles.wrapper}>
        <h1>{newsItem.title}</h1>

        <Feedback />
      </Wrapper>
    </>
  )
}
