import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryList } from '../../components/CategoryList'
import { ItemsView } from '../../components/ItemsView'
import { getItemsDB } from '../../store/items/actions'
import { selectItems } from '../../store/items/selectors'
import './styles.scss'

const viewTypes = ['По категориям', 'По товарам']

export const Items: React.FC = () => {
  const [viewType, setViewType] = useState(viewTypes[1])
  const items = useSelector(selectItems)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsDB())
  }, [])

  return (
    <div className="items pd-4">
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

      <div className="mt-2">
        {viewType === viewTypes[0] && <CategoryList />}

        {viewType === viewTypes[1] && <ItemsView items={items} />}
      </div>
    </div>
  )
}
