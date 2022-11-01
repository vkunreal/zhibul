import { useLocation } from 'react-router'
import { IItem } from '../../interfaces/Items'

interface ILocationItem {
  item: IItem
}

export const Configure: React.FC = () => {
  const item = (useLocation().state as ILocationItem).item
  return (
    <div className="d-flex flex-column g-2 mt-4">
      <h2>{item.name}</h2>
      <p>
        <b>Категория:</b> {item.category}
      </p>
      <p>
        <b>Бренд:</b> {item.brand}
      </p>
      <p>
        <b>Производитель:</b> {item.manufacturer}
      </p>
      <p>
        <b>Описание:</b> {item.description}
      </p>
      <p>
        <b>Цена:</b> {item.price}
      </p>
    </div>
  )
}
