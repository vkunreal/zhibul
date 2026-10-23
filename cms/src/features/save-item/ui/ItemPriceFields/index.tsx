import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'

import { FormTextField } from '@shared/ui'

import { ItemPriceFieldsProps } from './interfaces'

export const ItemPriceFields = ({ control, valutes }: ItemPriceFieldsProps) => {
  return (
    <>
      <FormTextField
        control={control}
        name='price'
        textFieldProps={{ label: 'Цена', autoComplete: 'off' }}
      />

      <Controller
        name='valute'
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel id='change-item-menu__valute'>Валюта</InputLabel>
            <Select
              labelId='change-item-menu__valute'
              value={field.value}
              onChange={field.onChange}
            >
              {valutes.map(({ title, id }) => (
                <MenuItem key={id} value={String(id)}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <FormTextField
        control={control}
        name='purchase'
        textFieldProps={{ label: 'Закупочная цена', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='profitability'
        textFieldProps={{ label: 'Рентабельность', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='postfix'
        textFieldProps={{ label: 'Постфикс цены', autoComplete: 'off' }}
      />
    </>
  )
}
