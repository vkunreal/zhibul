import { FC } from 'react'

import { Typography } from '@/shared/ui'

import s from './styles.module.scss'

export const ProductTitle: FC<{ children: string }> = ({ children }) => {
  return (
    <Typography
      className={s.title}
      tag="h1"
      size="xxlRelative"
      textCenter
      uppercase
    >
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </Typography>
  )
}
