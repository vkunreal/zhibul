import { SelectChangeEvent } from '@mui/material'

import { CategoryOption } from '@entities/items/model'

export interface ItemsFiltersProps {
  search: string
  categoryUrl: string
  categories: CategoryOption[]
  onSearchChange: (value: string) => void
  onCategoryChange: (event: SelectChangeEvent) => void
}
