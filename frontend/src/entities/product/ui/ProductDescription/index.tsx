import { FC } from 'react'

import { Typography } from '@/shared/ui'

import s from './styles.module.scss'

export const ProductDescription: FC<{ children: string }> = ({ children }) => {
  if (!children) {
    return null
  }

  return (
    <section>
      <Typography tag="h2" size="xlRelative">
        Описание товара:
      </Typography>

      <Typography className={s.description} size="sm">
        <span dangerouslySetInnerHTML={{ __html: children }} />
      </Typography>
    </section>
  )
}
