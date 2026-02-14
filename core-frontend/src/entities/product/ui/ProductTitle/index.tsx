import { FC } from 'react'

import { Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const ProductTitle: FC<{ children: string }> = ({ children }) => {
  return (
    <Typography
      className={styles.title}
      tag="h1"
      size="xxlRelative"
      textCenter
      upperCase
    >
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </Typography>
  )
}
