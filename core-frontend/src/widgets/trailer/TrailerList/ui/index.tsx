import { FC } from 'react'

import { TrailerRent } from '@/entities/trailer'
import { ButtonLink, FlexImage, Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const TrailerList: FC<{ list: TrailerRent[]; phone: string }> = ({
  list,
  phone,
}) => {
  return (
    <ul className={styles.list}>
      {list.map(({ id, title, description, url, image_src }) => (
        <li key={id} className={styles.item}>
          <FlexImage
            src={image_src}
            alt="Прицеп"
            maxWidth={400}
            loading="lazy"
          />

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
