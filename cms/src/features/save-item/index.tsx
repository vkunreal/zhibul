import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { $countries } from '@entities/countries'
import { CategoryOption } from '@entities/items/model'
import { FormModal, SeoFields } from '@shared/ui'

import { emptyItemForm } from './constants'
import { ItemMenuProps } from './interfaces'
import { toItemForm } from './mappers'
import { ItemFlags } from './ui/ItemFlags'
import { ItemMainFields } from './ui/ItemMainFields'
import { ItemPriceFields } from './ui/ItemPriceFields'

import s from './styles.module.scss'

export const ItemMenu: React.FC<ItemMenuProps> = ({
  item,
  categories,
  isOpen,
  onClose,
  onSubmit: submitItem,
  valutes,
}) => {
  const countries = useUnit($countries)
  const { control, reset, setValue, watch, handleSubmit } = useForm({
    defaultValues: emptyItemForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitItem(values)
    onClose()
  })

  useEffect(() => {
    reset(toItemForm(item, countries))
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
      contentClassName={s.menu}
    >
      <ItemFlags control={control} />
      <ItemMainFields
        control={control}
        categories={categories}
        categoryName={item?.categoryName}
        countries={countries}
        onCategorySelect={handleCategorySelect}
      />
      <ItemPriceFields control={control} valutes={valutes} />
      <SeoFields control={control} />
    </FormModal>
  )
}
