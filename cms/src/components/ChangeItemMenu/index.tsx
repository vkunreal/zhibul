import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { IItem } from '../../interfaces/Items'
import { IItemCategory } from '../ItemsView'
import { SelectItemCategory } from '../SelectItemCategory'

interface IChangeItemMenu {
  item: IItem
  categories: IItemCategory[]
  isOpen: boolean
  onClose: () => void
  saveItem: (item: IItem) => void
}

export const ChangeItemMenu: React.FC<IChangeItemMenu> = ({
  item,
  categories,
  isOpen,
  onClose,
  saveItem,
}) => {
  const [categoryId, setCategoryId] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    setName(item?.name || '')
    setDescription(item?.description || '')
    setBrand(item?.brand || '')
    setManufacturer(item?.manufacturer || '')
    setPrice(item?.price || '')
  }, [item])

  const handleCategorySelect = (category: IItemCategory) => {
    setCategoryId(category?.id || 0)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Изменение товара</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <SelectItemCategory
          value={item?.category}
          categories={categories}
          onSelect={handleCategorySelect}
        />

        <TextField
          placeholder="Название"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextField
          placeholder="Описание"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          placeholder="Бренд"
          value={brand}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBrand(e.target.value)
          }
        />

        <TextField
          placeholder="Производитель"
          value={manufacturer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setManufacturer(e.target.value)
          }
        />

        <TextField
          placeholder="Цена"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              const newItem = {
                ...item,
                item_id: item.id,
                category_id: categoryId,
                name,
                description,
                brand,
                manufacturer,
                price,
              }
              saveItem(newItem)
            }}
          >
            Сохранить
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
