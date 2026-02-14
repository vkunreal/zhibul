import Image from 'next/image'
import { FC } from 'react'

import { Trailer } from '@/entities/trailer'
import { ButtonLink, Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const TrailerList: FC<{ list: Trailer[]; phone: string }> = ({
  list,
  phone,
}) => {
  return (
    <ul className={styles.list}>
      {list.map(({ id, title, description, url, image_src }) => (
        <li key={id} className={styles.item}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={image_src}
              alt="Прицеп"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>

          <div className={styles.itemBody}>
            <div>
              <Typography tag="h2" size="xl" fontWeight={700}>
                {title}
              </Typography>

              <Typography className={styles.description} size="sm">
                {description}
              </Typography>
            </div>

            <div className={styles.actions}>
              <ButtonLink
                href={`/arenda_prizepa/${url}`}
                size="small"
                uppercase
              >
                Подробнее
              </ButtonLink>

              <ButtonLink
                href={`tel:${phone}`}
                size="small"
                variant="white"
                uppercase
              >
                Позвонить
              </ButtonLink>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
