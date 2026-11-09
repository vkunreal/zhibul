import { Control } from 'react-hook-form'

import { ItemFormValues } from '../../interfaces'

export interface ItemFlagsProps {
  control: Control<ItemFormValues, unknown, ItemFormValues>
}
