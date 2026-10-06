import Link from 'next/link'
import { FC } from 'react'

import { ButtonLink, FlexImage } from '@/shared/ui'
import { getDate } from '@/shared/utils'

import { NewsItemProps } from './interfaces'
import s from './styles.module.scss'

export const NewsItem: FC<NewsItemProps> = ({ item }) => {
  return (
    <div className={s.item}>
      <FlexImage src={item.media[0].src} alt="image" maxWidth={350} />

      <div className={s.content}>
        <div className={s.info}>
          <h2 className={s.title}>
            <Link href={`/news/${item.url}`}>{item.title}</Link>
          </h2>

          <time className={s.time}>{getDate(item.date)}</time>

          <p
            className={s.description}
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
