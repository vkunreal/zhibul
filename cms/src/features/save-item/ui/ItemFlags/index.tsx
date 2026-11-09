import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

import { ItemFlagsProps } from './interfaces'

import s from './styles.module.scss'

export const ItemFlags = ({ control }: ItemFlagsProps) => {
  return (
    <div className={s.root}>
      <Controller
        name='isActive'
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                checked={field.value}
                onChange={(_, checked) => field.onChange(checked)}
              />
            }
            label='Активен'
            slotProps={{ typography: { variant: 'body2' } }}
          />
        )}
      />

      <Controller
        name='isOrderOnly'
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                checked={field.value}
                onChange={(_, checked) => field.onChange(checked)}
              />
            }
            label='Только по заказу'
            slotProps={{ typography: { variant: 'body2' } }}
          />
        )}
      />
    </div>
  )
}
