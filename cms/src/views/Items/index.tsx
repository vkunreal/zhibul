import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryDetails } from '../../components/CategoryDetails'
import { selectCategories } from '../../store/items/selectors'
import { getCategoriesDB } from '../../store/items/actions'
import './styles.scss'

const viewTypes = ['По категориям', 'По товарам']

export const Items: React.FC = () => {
  const [viewType, setViewType] = useState(viewTypes[0])
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesDB())
  }, [])

  const getCategories = (parent_id: number | null) =>
    categories.filter((category) => category.parent_id === parent_id)

  return (
    <div className="items pd-2">
      <h1>Товары</h1>

      <div className="items__sort mt-1">
        <h3 className="items__sort--title mb-1">Вид:</h3>

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
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
