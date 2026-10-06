import { FC, PropsWithChildren } from 'react'

import { Typography } from '@/shared/ui'

import s from './styles.module.scss'

export const NewsTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography size="xxlRelative" textCenter className={s.title}>
      {children}
    </Typography>
  )
}
