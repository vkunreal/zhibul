import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryDetails } from '../../components/CategoryDetails'
import { selectCategories } from '../../store/items/selectors'
import {
  addCategoryDB,
  changeCategoryDB,
  deleteCategoryDB,
  getCategoriesDB,
} from '../../store/items/actions'
import { Confirm } from '../../components/Confirm'
import { ChangeMenu } from '../../components/ChangeMenu'
import { Button } from '@mui/material'
import { ICategory } from '../../interfaces/Items'
import { AddCategoryButton } from '../../components/AddCategoryButton'
import './styles.scss'
import { AddMenu } from '../../components/AddMenu'

const viewTypes = ['По категориям', 'По товарам']

export const Items: React.FC = () => {
  const categories = useSelector(selectCategories)
  const [viewType, setViewType] = useState(viewTypes[0])

  const [deletedCategory, setDeletedCategory] = useState<ICategory | null>(null)
  const [changedCategory, setChangedCategory] = useState<ICategory>(
    categories[0]
  )
  const [parentId, setParentId] = useState<number | null>(null)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesDB())
  }, [])

  const getCategories = (parent_id: number | null) =>
    categories.filter((category) => category.parent_id === parent_id)

  const saveCategory = (category: ICategory) => {
    const { id, name } = category

    dispatch(changeCategoryDB(id, name))
    setChangeDialog(false)
  }

  const deleteCategory = () => {
    const id = deletedCategory?.id
    dispatch(deleteCategoryDB(id))
    setDeleteDialog(false)
  }

  const addCategory = (category: any) => {
    dispatch(addCategoryDB(category))
    setAddDialog(false)
  }

  const setChangeCategory = (category: ICategory) => {
    setChangedCategory(category)
    setChangeDialog(true)
  }

  const setDeleteCategory = (category: ICategory) => {
    setDeletedCategory(category)
    setDeleteDialog(true)
  }

  const handleSetParentId = (id: number) => {
    setParentId(id)
    setAddDialog(true)
    console.log(id)
  }

  return (
    <div className="items pd-2">
      <h1>Товары</h1>

      <div className="items__sort d-flex align-center g-2 mt-1">
        <h3 className="items__sort--title mt-1 mb-1">Вид:</h3>

        <ul className="items__sort__list d-flex">
          {viewTypes.map((type: string) => (
            <li
              className={
                viewType === type
                  ? 'items__sort__list--item active'
                  : 'items__sort__list--item'
              }
              key={type}
              onClick={() => setViewType(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      {viewType === viewTypes[0] && (
        <ul className="items__list mt-3">
          {categories
            .filter((el) => el.parent_id === null)
            .map((category) => (
              <li key={category.id}>
                <CategoryDetails
                  categories={categories}
                  category={category}
                  getCategories={getCategories}
                  setParentId={handleSetParentId}
                  setDeletedCategory={setDeleteCategory}
                  setChangedCategory={setChangeCategory}
                />
              </li>
            ))}

          <AddCategoryButton
            onClick={() => {
              setAddDialog(true)
              setParentId(null)
            }}
          />
        </ul>
      )}

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title="Вы уверены, что хотите удалить категорию?"
      >
        <Button variant="outlined" color="success" onClick={deleteCategory}>
          Удалить
        </Button>
      </Confirm>

      <ChangeMenu
        isOpen={changeDialog}
        onClose={() => setChangeDialog(false)}
        category={changedCategory}
        saveCategory={saveCategory}
      />

      <AddMenu
        isOpen={addDialog}
        parent_id={parentId}
        onClose={() => setAddDialog(false)}
        addCategory={addCategory}
      />
    </div>
  )
}
