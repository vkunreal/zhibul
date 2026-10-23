import { Control } from 'react-hook-form'

import { Country } from '@entities/countries/model'
import { CategoryOption } from '@entities/items/model'

import { ItemFormValues } from '../../interfaces'

export interface ItemMainFieldsProps {
  control: Control<ItemFormValues, unknown, ItemFormValues>
  categories: CategoryOption[]
  categoryName?: string
  countries: Country[]
  onCategorySelect: (category?: CategoryOption) => void
}
