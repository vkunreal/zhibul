import cn from 'classnames'
import { FC } from 'react'

import { notoSans } from '@/shared/assets'
import { Typography } from '@/shared/ui'

import s from './styles.module.scss'

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
  <Typography className={s.field}>
    <span className={cn(s.fieldName, notoSans.className)}>{name}:</span>

    <span className={notoSans.className}>
      {' '}
      {isDropdown ? value.split('-').join(' - ') : value}{' '}
    </span>
  </Typography>
)
