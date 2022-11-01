import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { IItem } from '../../interfaces/Items'
import { IItemCategory } from '../ItemsView'
import { SelectItemCategory } from '../SelectItemCategory'

interface IAddItemMenu {
  categories: IItemCategory[]
  isOpen: boolean
  onClose: () => void
  addItem: (item: IItem) => void
}

export const AddItemMenu: React.FC<IAddItemMenu> = ({
  categories,
  isOpen,
  onClose,
  addItem,
}) => {
  const [category, setCategory] = useState<IItemCategory | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')

  const handleCategorySelect = (category: IItemCategory) => {
    setCategory(category)
  }

  const submitDisabled = () => {
    return !category?.id || !name.trim() || !description.trim() || !brand.trim() || !manufacturer.trim() || !price.trim()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление товара</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <SelectItemCategory
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
                category_id: category?.id || 0,
                category: category?.name || '',
                name,
                description,
                brand,
                manufacturer,
                price,
              }
              addItem(newItem)
            }}
            disabled={submitDisabled()}
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
