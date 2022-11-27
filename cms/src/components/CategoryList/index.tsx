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
import { ChangeCategoryMenu } from '../ChangeCategoryMenu'
import { Button } from '@mui/material'
import { ICategory, ICategoryCandidate } from '../../interfaces/Items'
import AddCategoryButton from '../../components/AddButton'
import { AddMenu } from '../../components/AddMenu'

export const CategoryList: React.FC = () => {
  const categories = useSelector(selectCategories)

  const [deletedCategory, setDeletedCategory] = useState<ICategory | null>(null)
  const [changedCategory, setChangedCategory] = useState<ICategory>(
    categories[0]
  )
  const [parentId, setParentId] = useState<number | null>(null)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)

  const dispatch = useDispatch()

  // get fresh categories
  useEffect(() => {
    dispatch(getCategoriesDB())
  }, [])

  // get categories form list by parent id
  const getCategories = (parent_id: number | null) =>
    categories.filter((category) => category.parent_id === parent_id)

  // save category in database
  const saveCategory = (category: ICategory) => {
    const { id, name } = category

    dispatch(changeCategoryDB(id, name))
    setChangeDialog(false)
  }

  // delete category in database
  const deleteCategory = () => {
    const id = deletedCategory?.id
    dispatch(deleteCategoryDB(id))
    setDeleteDialog(false)
  }

  // add category in database
  const addCategory = (category: ICategoryCandidate) => {
    dispatch(addCategoryDB(category))
    setAddDialog(false)
  }

  // set changing category
  const setChangeCategory = (category: ICategory) => {
    setChangedCategory(category)
    setChangeDialog(true)
  }

  // set deleting category
  const setDeleteCategory = (category: ICategory) => {
    setDeletedCategory(category)
    setDeleteDialog(true)
  }

  // set parent id of adding category
  const handleSetParentId = (id: number) => {
    setParentId(id)
    setAddDialog(true)
    console.log(id)
  }

  return (
    <div className="items pd-2">
      {/* categories list */}
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

        {/* add new category button */}
        <AddCategoryButton
          className="items__category-button"
          onClick={() => {
            setAddDialog(true)
            setParentId(null)
          }}
        >
          Добавить категорию
        </AddCategoryButton>
      </ul>

      {/* delete category confirm */}
      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title="Вы уверены, что хотите удалить категорию?"
      >
        <Button variant="outlined" color="success" onClick={deleteCategory}>
          Удалить
        </Button>
      </Confirm>

      {/* change category menu */}
      <ChangeCategoryMenu
        isOpen={changeDialog}
        onClose={() => setChangeDialog(false)}
        category={changedCategory}
        saveCategory={saveCategory}
      />

      {/* add category menu */}
      <AddMenu
        isOpen={addDialog}
        parent_id={parentId}
        onClose={() => setAddDialog(false)}
        addCategory={addCategory}
      />
    </div>
  )
}
