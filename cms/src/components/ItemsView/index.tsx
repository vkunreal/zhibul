import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICategory, IItem } from '../../interfaces/Items'
import {
  addItemDB,
  changeItemDB,
  deleteItemDB,
  getCategoriesDB,
} from '../../store/items/actions'
import AddItemButton from '../AddButton'
import { AddItemMenu } from '../AddItemMenu'
import { ChangeItemMenu } from '../ChangeItemMenu'
import { Confirm } from '../Confirm'
import { ItemsTable } from '../ItemsTable'
import { SelectItemCategory } from '../SelectItemCategory'
import { selectCategories } from '../../store/items/selectors'

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
  const [addDialog, setAddDialog] = useState(false)

  const [deletedItem, setDeletedItem] = useState<IItem | null>(null)
  const [changedItem, setChangedItem] = useState<IItem>(filteredItems[0])

  const allCategoriesDB = useSelector(selectCategories)
  const [allCategories, setAllCategories] = useState<ICategory[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift({ id: 0, name: '-' })
    setCategories(itemCategories)
    setCategory(itemCategories[0].name)
    dispatch(getCategoriesDB())
  }, [])

  useEffect(() => {
    const filteredCategories = allCategoriesDB.filter(
      (category) => !category.is_contains
    )
    setAllCategories(filteredCategories)
  }, [allCategoriesDB])

  useEffect(() => {
    const itemCategories = getCategories()
    itemCategories.unshift({ name: '-' })
    setCategories(itemCategories)
    setCategory(itemCategories[0].name)
    console.log(items.filter((i: any) => i.url.toLowerCase() === 'test'))
  }, [items])

  useEffect(() => {
    if (category === '-' || !category) {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter((item) => item.category_name === category))
    }
  }, [category, items])

  const getCategories = () => {
    const allCategories: IItemCategory[] = []

    items.forEach(({ category_name, category_id }) => {
      const idArr = allCategories.map((category) => category.id)
      if (!idArr.includes(category_id)) {
        allCategories.push({ id: category_id, name: category_name })
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

  const handleAddItem = (item: IItem) => {
    dispatch(addItemDB(item))
    setAddDialog(false)
  }

  const handleSelectCategory = (changeCategory: IItemCategory) => {
    setCategory(changeCategory?.name || '')
  }

  return (
    <div>
      <SelectItemCategory
        categories={categories}
        category={category}
        onSelect={handleSelectCategory}
      />

      <AddItemButton className="mt-2" onClick={() => setAddDialog(true)}>
        Добавить товар
      </AddItemButton>

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

      <AddItemMenu
        isOpen={addDialog}
        categories={allCategories}
        onClose={() => setAddDialog(false)}
        addItem={handleAddItem}
      />
    </div>
  )
}
