import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'


import { $countries } from '@entities/countries'
import { CategoryOption } from '@entities/items/model'
import { SelectItemCategory } from '@entities/items/ui/SelectItemCategory'
import { FormModal, FormTextField, RichTextEditor } from '@shared/ui'

import { emptyItemForm } from './constants'
import { ItemMenuProps } from './interfaces'
import { changeItemSubmitted, createItemSubmitted } from './model'

import './styles.scss'

export const ItemMenu: React.FC<ItemMenuProps> = ({
  item,
  categories,
  isOpen,
  onClose,
  valutes,
}) => {
  const countries = useUnit($countries)
  const [createItem, changeItem] = useUnit([
    createItemSubmitted,
    changeItemSubmitted,
  ])
  const { control, reset, setValue, watch, handleSubmit } = useForm({
    defaultValues: emptyItemForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (item) changeItem({ values, item })
    else createItem(values)
    onClose()
  })

  useEffect(() => {
    if (!item) return

    const currentManufacturer = countries.find(
      (country) => country.name === item.manufacturer,
    )

    reset({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      url: item.url,
      position: item.position,
      name: item.name,
      description: item.description,
      brand: item.brand,
      manufacturer: currentManufacturer?.name || '',
      price: item.price,
      valute: String(item.valuteId),
      purchase: item.purchasePrice?.toString() ?? '',
      profitability: item.profitability?.toString() ?? '',
      postfix: item.pricePostfix,
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      seoKeywords: item.seoKeywords,
      isActive: item.isActive,
      isOrderOnly: item.isOrderOnly,
    })
  }, [item, countries, reset])

  const handleCategorySelect = (category?: CategoryOption) => {
    setValue('categoryId', category?.id || 0)
    setValue('categoryName', category?.name || '')
  }

  const values = watch()
  const submitDisabled =
    !values.categoryId ||
    !values.url.trim() ||
    !values.name.trim() ||
    !values.description.trim() ||
    !values.brand.trim() ||
    !values.manufacturer.trim() ||
    !values.price.trim()

  return (
    <FormModal
      isOpen={isOpen}
      title={item ? 'Изменение товара' : 'Добавление товара'}
      onClose={onClose}
      onSubmit={onSubmit}
      submitDisabled={!item && submitDisabled}
      contentClassName='change-item-menu pt-1'
    >
      <div className='d-flex g-2'>
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

      <SelectItemCategory
        value={item?.categoryName}
        categories={categories}
        onSelect={handleCategorySelect}
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
      <FormTextField
        control={control}
        name='seoTitle'
        textFieldProps={{ label: 'SEO Title', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='seoDescription'
        textFieldProps={{ label: 'SEO Description', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='seoKeywords'
        textFieldProps={{ label: 'SEO Keywords', autoComplete: 'off' }}
      />
    </FormModal>
  )
}
