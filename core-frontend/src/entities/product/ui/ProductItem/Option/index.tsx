import { FC } from 'react'

import { Typography } from '@/shared/ui'

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
    <span className={styles.fieldName}>{name}:</span>

    <span> {isDropdown ? value.split('-').join(' - ') : value} </span>
  </Typography>
)
