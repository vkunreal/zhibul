import Link from 'next/link'
import { FC } from 'react'

import { ButtonLink, FlexImage } from '@/shared/ui'
import { getDate } from '@/shared/utils'

import { NewsItemProps } from './interfaces'
import styles from './styles.module.scss'

export const NewsItem: FC<NewsItemProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <FlexImage src={item.media[0].src} alt="image" maxWidth={350} />

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
          <ButtonLink href={`/news/${item.url}`} size="small" uppercase>
            Подробнее
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
