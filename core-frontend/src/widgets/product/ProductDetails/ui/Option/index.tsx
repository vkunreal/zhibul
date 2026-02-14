import cn from 'classnames'
import { FC } from 'react'

import { notoSerif } from '@/shared/assets'

import styles from './styles.module.scss'

interface OptionProps {
  name: string
  value: string
}

export const Option: FC<OptionProps> = ({ name, value }) => (
  <div className={cn(styles.container)}>
    <span className={notoSerif.className}>{name}</span>
    <div className={styles.divider} />
    <span className={notoSerif.className}>{value}</span>
  </div>
)
