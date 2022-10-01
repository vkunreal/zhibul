import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { ICategory } from '../../interfaces/Items'
import { Spacer } from '../Spacer'

export const CategoryDetails = ({
  categories,
  category,
  getCategories,
  setDeletedCategory,
  setChangedCategory,
}: any) => {
  // data
  const [subcategories, setSubcategories] = useState<ICategory[]>([])

  // visibles
  const [subVisible, setSubVisible] = useState(false)
  const [btnsVisible, setBtnsVisible] = useState(false)

  useEffect(() => {
    setSubcategories(getCategories(category.id))
  }, [categories])

  const openDeleteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setDeletedCategory(category)
  }

  const openChangeMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setChangedCategory(category)
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
            <Button onClick={openChangeMenu}>Изменить</Button>
            <Button onClick={openDeleteDialog}>Удалить</Button>
          </div>
        )}
      </div>

      <ul className="ml-6">
        {subVisible &&
          subcategories.map((subcategory) => (
            <CategoryDetails
              key={subcategory.id}
              category={subcategory}
              categories={categories}
              getCategories={getCategories}
              setDeletedCategory={setDeletedCategory}
              setChangedCategory={setChangedCategory}
            />
          ))}
      </ul>
    </div>
  )
}
