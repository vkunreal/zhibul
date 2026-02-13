import { FC, PropsWithChildren } from 'react'

import { Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const NewsTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography size="xxl" textCenter className={styles.title}>
      {children}
    </Typography>
  )
}
