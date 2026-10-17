import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { SelectItemCategoryProps } from './interfaces'

export const SelectItemCategory: React.FC<SelectItemCategoryProps> = ({
  value,
  categories,
  category,
  onSelect,
}) => {
  const [changeCategory, setChangeCategory] = useState(value || '')

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setChangeCategory(e.target.value)
  }

  useEffect(() => {
    const category = categories.find(
      (category) => category.name === changeCategory,
    )
    onSelect(category)
  }, [changeCategory])

  useEffect(() => {
    const category = categories.find(
      (category) => category.name === changeCategory,
    )
    onSelect(category)
  }, [category])

  return (
    <FormControl fullWidth>
      <InputLabel id='items-view__label'>Категория</InputLabel>

      <Select
        labelId='items-view__label'
        value={changeCategory}
        onChange={handleCategoryChange}
      >
        {categories
          .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
          .map(({ name, id }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
