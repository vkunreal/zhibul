import React, { useState } from 'react'
import { CategoryList } from '../../components/CategoryList'
import './styles.scss'

const viewTypes = ['По категориям', 'По товарам']

export const Items: React.FC = () => {
  const [viewType, setViewType] = useState(viewTypes[0])

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

      {viewType === viewTypes[0] && <CategoryList />}
    </div>
  )
}
