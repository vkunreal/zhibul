import { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { IItemCategory } from '../ItemsView'

interface ISelectItemCategory {
  value?: string
  categories: IItemCategory[]
  onSelect: (category: IItemCategory) => void
}

export const SelectItemCategory: React.FC<ISelectItemCategory> = ({
  value,
  categories,
  onSelect,
}) => {
  const [changeCategory, setChangeCategory] = useState(value || '')

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setChangeCategory(e.target.value as string)
  }

  useEffect(() => {
    const category = categories.filter(
      (category) => category.name === changeCategory
    )[0]
    onSelect(category)
  }, [changeCategory])

  return (
    <FormControl fullWidth>
      <InputLabel id="items-view__label">Категория</InputLabel>

      <Select
        labelId="items-view__label"
        value={changeCategory}
        onChange={handleCategoryChange}
      >
        {categories.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
