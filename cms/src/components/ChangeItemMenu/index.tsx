import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { IItem } from '../../interfaces/Items'

interface IChangeItemMenu {
  item: IItem
  isOpen: boolean
  onClose: () => void
  saveItem: (item: IItem) => void
}

export const ChangeItemMenu: React.FC<IChangeItemMenu> = ({
  item,
  isOpen,
  onClose,
  saveItem,
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    setName(item.name)
    setDescription(item.description)
    setBrand(item.brand)
    setManufacturer(item.manufacturer)
    setPrice(item.price)
  }, [item])

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Изменение категории</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
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
