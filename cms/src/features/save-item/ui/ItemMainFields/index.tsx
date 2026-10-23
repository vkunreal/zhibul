import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'

import { SelectItemCategory } from '@entities/items/ui/SelectItemCategory'
import { FormTextField, RichTextEditor } from '@shared/ui'

import { ItemMainFieldsProps } from './interfaces'

export const ItemMainFields = ({
  control,
  categories,
  categoryName,
  countries,
  onCategorySelect,
}: ItemMainFieldsProps) => {
  return (
    <>
      <SelectItemCategory
        value={categoryName}
        categories={categories}
        onSelect={onCategorySelect}
      />

      <FormTextField
        control={control}
        name='url'
        textFieldProps={{ label: 'URL', autoComplete: 'off' }}
      />

      <FormTextField
        control={control}
        name='position'
        parseValue={(value) => parseInt(value)}
        textFieldProps={{ label: 'Позиция', autoComplete: 'off' }}
      />

      <FormTextField
        control={control}
        name='name'
        textFieldProps={{ label: 'Название', autoComplete: 'off' }}
      />
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <RichTextEditor
            label='Описание'
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormTextField
        control={control}
        name='brand'
        textFieldProps={{ label: 'Бренд', autoComplete: 'off' }}
      />

      <Controller
        name='manufacturer'
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel id='change-item-menu__label'>Производитель</InputLabel>
            <Select
              labelId='change-item-menu__label'
              value={field.value}
              onChange={field.onChange}
            >
              {countries.map(({ name, id }) => (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
