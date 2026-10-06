import cn from 'classnames'
import { FC } from 'react'

import s from './styles.module.scss'

interface OptionProps {
  name: string
  value: string
}

export const Option: FC<OptionProps> = ({ name, value }) => (
  <div className={cn(s.container)}>
    <span>{name}</span>
    <div className={s.divider} />
    <span>{value}</span>
  </div>
)
