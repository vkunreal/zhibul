import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { categorySortModeOptions } from '@entities/items'
import { FormModal, FormTextField, SeoFields } from '@shared/ui'

import { emptyCategoryForm } from './constants'
import { CategoryMenuProps } from './interfaces'
import { toCategoryForm } from './mappers'
import { CategoryImage } from './ui/CategoryImage'

export const CategoryMenu = ({
  category,
  isOpen,
  onClose,
  onSubmit: submitCategory,
}: CategoryMenuProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyCategoryForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitCategory({ values, image: selectedImage })
    setSelectedImage(null)
    onClose()
  })

  const handleClose = () => {
    setSelectedImage(null)
    onClose()
  }

  useEffect(() => {
    reset(toCategoryForm(category))
  }, [category, reset])

  return (
    <FormModal
      isOpen={isOpen}
      title={category ? 'Изменение категории' : 'Добавление категории'}
      onClose={handleClose}
      onSubmit={onSubmit}
      submitText={category ? 'Сохранить' : 'Добавить'}
    >
      <CategoryImage
        key={category?.id ?? 'new'}
        category={category}
        onFileChange={setSelectedImage}
      />

      <FormTextField
        control={control}
        name='position'
        parseValue={(value) => parseInt(value)}
        textFieldProps={{ label: 'Позиция' }}
      />
      <FormTextField
        control={control}
        name='url'
        textFieldProps={{ label: 'URL' }}
      />
      <FormTextField
        control={control}
        name='name'
        textFieldProps={{ label: 'Название' }}
      />
      <FormTextField
        control={control}
        name='description'
        textFieldProps={{ label: 'Описание' }}
      />
      {/* Сортировка только у конечных категорий — в них лежат товары, не подкатегории. */}
      {(!category || !category.hasSubcategories) && (
        <Controller
          name='sortMode'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size='small'>
              <InputLabel id='category-sort-mode-label'>
                Сортировка товаров
              </InputLabel>
              <Select
                labelId='category-sort-mode-label'
                label='Сортировка товаров'
                value={field.value}
                onChange={field.onChange}
              >
                {categorySortModeOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Доступна только для категорий с товарами, без подкатегорий
              </FormHelperText>
            </FormControl>
          )}
        />
      )}
      <SeoFields control={control} />
    </FormModal>
  )
}
