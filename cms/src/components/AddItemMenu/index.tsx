import { useEffect, useState } from 'react'
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
import { IItem } from '../../interfaces/Items'
import { IItemCategory } from '../ItemsView'
import { SelectItemCategory } from '../SelectItemCategory'
import { useSelector } from 'react-redux'
import { selectCountries } from '../../store/items/selectors'

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
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')

  const countries = useSelector(selectCountries)

  const handleCategorySelect = (category: IItemCategory) => {
    setCategory(category)
  }

  const submitDisabled = () => {
    return (
      !category?.id ||
      !name.trim() ||
      !description.trim() ||
      !brand.trim() ||
      !manufacturer.trim() ||
      !price.trim()
    )
  }

  const handleManufacrurerChange = (e: SelectChangeEvent) => {
    setManufacturer(e.target.value)
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
          label="URL"
          autoComplete="off"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />

        <TextField
          label="Название"
          autoComplete="off"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextField
          label="Описание"
          autoComplete="off"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          label="Бренд"
          autoComplete="off"
          value={brand}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBrand(e.target.value)
          }
        />

        <FormControl>
          <InputLabel id="change-item-menu__label">Производитель</InputLabel>

          <Select
            labelId="change-item-menu__label"
            value={manufacturer}
            onChange={handleManufacrurerChange}
          >
            {countries.map(({ name, id }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Цена"
          autoComplete="off"
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
              const manufacturerId = countries.filter(
                (c) => c.name === manufacturer
              )[0].id
              const newItem = {
                category_id: category?.id || 0,
                category_name: category?.name || '',
                url,
                name,
                description,
                brand,
                manufacturer: manufacturerId,
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
