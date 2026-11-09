import { Control } from 'react-hook-form'

import { Valute } from '@entities/valutes/model'

import { ItemFormValues } from '../../interfaces'

export interface ItemPriceFieldsProps {
  control: Control<ItemFormValues, unknown, ItemFormValues>
  valutes: Valute[]
}
