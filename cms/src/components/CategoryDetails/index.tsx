import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { ICategory } from '../../interfaces/Items'
import { Confirm } from '../Confirm'
import { Spacer } from '../Spacer'
import { deleteCategoryDB } from '../../store/items/actions'

export const CategoryDetails = ({
  categories,
  category,
  getCategories,
}: any) => {
  // data
  const [subcategories, setSubcategories] = useState<ICategory[]>([])
  const [deletedCategory, setDeletedCategory] = useState<ICategory | null>(null)

  // visibles
  const [subVisible, setSubVisible] = useState(false)
  const [btnsVisible, setBtnsVisible] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setSubcategories(getCategories(category.id))
  }, [categories])

  const openDeleteDialog = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: ICategory
  ) => {
    e.stopPropagation()
    setDeleteDialog(true)
    setDeletedCategory(category)
  }

  const deleteCategory = async () => {
    setDeleteDialog(false)
    const id = deletedCategory?.id
    dispatch(deleteCategoryDB(id))
  }

  return (
    <div className="items__category">
      <div
        className="items__category__name d-flex align-center"
        onClick={() => {
          setSubVisible((prevVal) => !prevVal)
        }}
        onMouseOver={() => setBtnsVisible(true)}
        onMouseLeave={() => setBtnsVisible(false)}
      >
        {category.name}
        <Spacer />
        {btnsVisible && (
          <div className="items__category__name--change-buttons">
            <Button>Изменить</Button>
            <Button onClick={(e) => openDeleteDialog(e, category)}>
              Удалить
            </Button>
          </div>
        )}
      </div>

      <ul className="ml-6">
        {subVisible &&
          subcategories.map((subcategory) => (
            <CategoryDetails
              key={subcategory.id}
              category={subcategory}
              getCategories={getCategories}
            />
          ))}
      </ul>

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title="Вы уверены, что хотите удалить категорию?"
      >
        <Button onClick={deleteCategory}>Удалить</Button>
      </Confirm>
    </div>
  )
}
