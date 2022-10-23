import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IItem } from '../../interfaces/Items'
import { changeItemDB, deleteItemDB } from '../../store/items/actions'
import { ChangeItemMenu } from '../ChangeItemMenu'
import { Confirm } from '../Confirm'
import { ItemsTable } from '../ItemsTable'
import { SelectItemCategory } from '../SelectItemCategory'

interface IItemsViewProps {
  items: IItem[]
}

export interface IItemCategory {
  id?: number
  name: string
}

export const ItemsView: React.FC<IItemsViewProps> = ({ items }) => {
  const [filteredItems, setFilteredItems] = useState(items)
  const [categories, setCategories] = useState<IItemCategory[]>([])
  const [category, setCategory] = useState('')

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)

  const [deletedItem, setDeletedItem] = useState<IItem | null>(null)
  const [changedItem, setChangedItem] = useState<IItem>(filteredItems[0])

  const dispatch = useDispatch()

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift({ name: '-' })
    setCategories(itemCategories)
    setCategory(itemCategories[0].name)
  }, [])

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift({ name: '-' })
    setCategories(itemCategories)
    setCategory(itemCategories[0].name)
  }, [items])

  useEffect(() => {
    if (category === '-') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter((item) => item.category === category))
    }
  }, [category, items])

  const getCategories = () => {
    const allCategories: IItemCategory[] = []

    items.forEach(({ category, category_id }) => {
      const idArr = allCategories.map((category) => category.id)
      if (!idArr.includes(category_id)) {
        allCategories.push({ id: category_id, name: category })
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

  const deleteItem = (id: number) => {
    dispatch(deleteItemDB(id))
    setDeleteDialog(false)
  }

  const handleSaveItem = (item: IItem) => {
    dispatch(changeItemDB(item))
    setChangeDialog(false)
  }

  const handleSelectCategory = (changeCategory: IItemCategory) => {
    setCategory(changeCategory?.name || '')
  }

  return (
    <div>
      <SelectItemCategory
        categories={categories}
        onSelect={handleSelectCategory}
      />

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
        <Button
          variant="outlined"
          color="success"
          onClick={() => deleteItem(deletedItem?.id || 0)}
        >
          Удалить
        </Button>
      </Confirm>

      <ChangeItemMenu
        isOpen={changeDialog}
        item={changedItem}
        categories={categories.filter(({ id }) => !!id)}
        onClose={() => setChangeDialog(false)}
        saveItem={handleSaveItem}
      />
    </div>
  )
}
