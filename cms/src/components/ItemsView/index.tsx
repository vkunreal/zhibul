import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { IItem } from '../../interfaces/Items'
import { ChangeItemMenu } from '../ChangeItemMenu'
import { Confirm } from '../Confirm'
import { ItemsTable } from '../ItemsTable'

interface IItemsViewProps {
  items: IItem[]
}

export const ItemsView: React.FC<IItemsViewProps> = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState(items)
  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState('')

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)

  const [deletedItem, setDeletedItem] = useState<IItem | null>(null)
  const [changedItem, setChangedItem] = useState<IItem>(filteredItems[0])

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

  const setDeleteItem = (item: IItem) => {
    setDeletedItem(item)
    setDeleteDialog(true)
  }

  const setChangeItem = (item: IItem) => {
    setChangedItem(item)
    setChangeDialog(true)
  }

  const handleSaveItem = (item: IItem) => {
    console.log(item)
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

      <ItemsTable
        items={filteredItems}
        setDeleteItem={setDeleteItem}
        setChangeItem={setChangeItem}
      />

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title={`Вы уверены, что хотите удалить товар ${
          deletedItem?.name || ''
        }?`}
      >
        <Button variant="outlined" color="success">
          Удалить
        </Button>
      </Confirm>

      <ChangeItemMenu
        isOpen={changeDialog}
        item={changedItem}
        onClose={() => setChangeDialog(false)}
        saveItem={handleSaveItem}
      />
    </div>
  )
}
