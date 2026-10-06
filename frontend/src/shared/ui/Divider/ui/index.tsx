import cn from 'classnames'
import { FC } from 'react'

import s from './styles.module.scss'

export const Divider: FC<{ center?: boolean }> = ({ center }) => {
  return <div className={cn(s.divider, { [s.center]: center })} />
}
