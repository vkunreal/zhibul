import { Chip, Stack } from '@mui/material'

import { ItemStatusChipsProps } from './interfaces'

import s from './styles.module.scss'

export const ItemStatusChips = ({
  isActive,
  isOrderOnly,
}: ItemStatusChipsProps) => {
  return (
    <Stack direction='row' spacing={0.75} useFlexGap className={s.root}>
      <Chip
        label={isActive ? 'Активен' : 'Не активен'}
        size='small'
        color={isActive ? 'success' : 'default'}
        variant={isActive ? 'filled' : 'outlined'}
      />
      <Chip
        label={isOrderOnly ? 'Под заказ' : 'В наличии'}
        size='small'
        color={isOrderOnly ? 'warning' : 'default'}
        variant='outlined'
      />
    </Stack>
  )
}
