import cn from 'classnames'
import { FC } from 'react'

import styles from './styles.module.scss'

interface OptionProps {
  name: string
  value: string
}

export const Option: FC<OptionProps> = ({ name, value }) => (
  <div className={cn(styles.container)}>
    <span>{name}</span>
    <div className={styles.divider} />
    <span>{value}</span>
  </div>
)
