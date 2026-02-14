import cn from 'classnames'
import { FC } from 'react'

import styles from './styles.module.scss'

export const Divider: FC<{ center?: boolean }> = ({ center }) => {
  return <div className={cn(styles.divider, { [styles.center]: center })} />
}
