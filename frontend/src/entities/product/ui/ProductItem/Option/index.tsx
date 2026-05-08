import { FC } from 'react'
import cn from 'classnames'

import { Typography } from '@/shared/ui'
import { notoSans } from '@/shared/assets'

import styles from './styles.module.scss'

interface ProductOptionProps {
  name: string
  value: string
  isDropdown?: boolean
}

export const ProductOption: FC<ProductOptionProps> = ({
  name,
  value,
  isDropdown = false,
}) => (
  <Typography className={styles.field}>
    <span className={cn(styles.fieldName, notoSans.className)}>{name}:</span>

    <span className={notoSans.className}>
      {' '}
      {isDropdown ? value.split('-').join(' - ') : value}{' '}
    </span>
  </Typography>
)
