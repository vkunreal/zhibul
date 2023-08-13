import { useEffect, useState } from 'react'
import { Button, Checkbox } from '@mui/material'
import { ICategory } from '../../interfaces/Items'
import { Spacer } from '../Spacer'
import AddCategoryButton from '../AddButton'
import axios from 'axios'
import API from '../../utils/api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/variables/selectors'

interface ICategoryDetailsProps {
  categories: ICategory[]
  category: ICategory
  getCategories: (id: number) => ICategory[]
  setDeletedCategory: (category: ICategory) => void
  setChangedCategory: (category: ICategory) => void
  setParentId: (id: number) => void
}

export const CategoryDetails: React.FC<ICategoryDetailsProps> = ({
  categories,
  category,
  getCategories,
  setDeletedCategory,
  setChangedCategory,
  setParentId,
}) => {
  // data
  const [subcategories, setSubcategories] = useState<ICategory[]>([])
  const [visible, setVisible] = useState(false)
  const token = useSelector(selectToken)

  // visibles
  const [subVisible, setSubVisible] = useState(false)
  const [btnsVisible, setBtnsVisible] = useState(false)

  useEffect(() => {
    setSubcategories(getCategories(category.id))
    setVisible(!!category.active)
  }, [categories])

  const openDeleteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setDeletedCategory(category)
  }

  const openChangeMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setChangedCategory(category)
  }

  const changeVisible = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await axios
      .put(
        API + '/api/category/active',
        {
          id: category.id,
          active: !!e.target.checked,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        setVisible(data.active)
      })
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
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={visible} onChange={changeVisible} />
        </div>

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
              setParentId={setParentId}
            />
          ))}

        {subVisible && (
          <AddCategoryButton
            className="items__category-button mb-1"
            onClick={() => setParentId(category.id)}
          >
            Добавить категорию
          </AddCategoryButton>
        )}
      </ul>
    </div>
  )
}
