import cn from 'classnames'
import { notFound } from 'next/navigation'

import { newsApi, NewsTitle } from '@/entities/news'
import { manrope } from '@/shared/fonts'
import { Breadcrumbs, Gallery, Typography, Wrapper } from '@/shared/ui'
import { Feedback } from '@/widgets/layout'

import styles from './styles.module.scss'

export async function generateStaticParams() {
  const news = await newsApi.getNews()

  if (!news.length) {
    return []
  }

  return news.map(({ url }) => ({
    news_slug: url,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ news_slug: string }>
}) {
  const { news_slug } = await params
  const newsItem = await newsApi.getNewsItem(news_slug)

  if (!newsItem) {
    return notFound()
  }

  const {
    title = 'Новости',
    seo_title = '',
    seo_description = '',
    seo_keywords = '',
  } = newsItem

  return {
    title: seo_title || title,
    description: seo_description,
    keywords: seo_keywords,
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

  const { title, media, text } = newsItem

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/', title: 'Главная' },
          { url: '/news/', title: 'Новости' },
        ]}
        activeTitle={newsItem.title}
      />

      <Wrapper className={styles.container}>
        <NewsTitle>{title}</NewsTitle>

        <section className={cn(styles.top, manrope.className)}>
          <div className={styles.media}>
            <Gallery images={media} alt={title} />
          </div>

          <Typography>
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </Typography>
        </section>
      </Wrapper>

      <Feedback />
    </>
  )
}
