import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { IItem } from '../../interfaces/Items'
import { ItemsTable } from '../ItemsTable'

interface IItemsViewProps {
  items: IItem[]
}

export const ItemsView: React.FC<IItemsViewProps> = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState(items)
  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift('-')
    setCategories(itemCategories)
    setCategory(itemCategories[0])
  }, [])

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift('-')
    setCategories(itemCategories)
    setCategory(itemCategories[0])
  }, [items])

  useEffect(() => {
    if (category === '-') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter((item) => item.category === category))
    }
  }, [category, items])

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string)
  }

  const getCategories = () => {
    const allCategories: string[] = []

    items.forEach(({ category }) => {
      if (!allCategories.includes(category)) {
        allCategories.push(category)
      }
    })

    return allCategories
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="items-view__label">Категория</InputLabel>

        <Select
          labelId="items-view__label"
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ItemsTable items={filteredItems} />
    </div>
  )
}
