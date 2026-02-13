import { FC } from 'react'

import { Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const ProductDescription: FC<{ children: string }> = ({ children }) => {
  if (!children) {
    return null
  }

  return (
    <section>
      <Typography tag="h2" size="xlRelative">
        Описание товара:
      </Typography>

      <Typography className={styles.description} size="md">
        <span dangerouslySetInnerHTML={{ __html: children }} />
      </Typography>
    </section>
  )
}
