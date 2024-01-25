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
  valutes: any[]
}

export const AddItemMenu: React.FC<IAddItemMenu> = ({
  categories,
  isOpen,
  onClose,
  addItem,
  valutes,
}) => {
  const [category, setCategory] = useState<IItemCategory | null>(null)
  const [url, setUrl] = useState('')
  const [position, setPosition] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('')
  const [valute, setValute] = useState('')
  const [purchase, setPurchase] = useState<string | null>(null)
  const [profitabilaty, setProfitabilaty] = useState<string | null>(null)
  const [postfix, setPostfix] = useState<string | null>(null)

  const countries = useSelector(selectCountries)

  const handleCategorySelect = (category: IItemCategory) => {
    setCategory(category)
  }

  const submitDisabled = () => {
    return (
      !category?.id ||
      !url.trim() ||
      !name.trim() ||
      !description.trim() ||
      !brand.trim() ||
      !manufacturer.trim() ||
      !price.trim() ||
      !seoTitle.trim() ||
      !seoDescription.trim() ||
      !seoKeywords.trim()
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
          label="Позиция"
          autoComplete="off"
          value={position}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPosition(parseInt(e.target.value))
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

        <FormControl>
          <InputLabel id="change-item-menu__label">Валюта</InputLabel>

          <Select
            labelId="change-item-menu__label"
            value={valute}
            onChange={(e) => setValute(e.target.value)}
          >
            {valutes.map(({ title, id }) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Закупочная цена"
          autoComplete="off"
          value={purchase}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPurchase(e.target.value)
          }
        />

        <TextField
          label="Рентабельность"
          autoComplete="off"
          value={profitabilaty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfitabilaty(e.target.value)
          }
        />

        <TextField
          label="Постфикс цены"
          autoComplete="off"
          value={postfix}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostfix(e.target.value)
          }
        />

        <TextField
          label="SEO Title"
          autoComplete="off"
          value={seoTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoTitle(e.target.value)
          }
        />

        <TextField
          label="SEO Description"
          autoComplete="off"
          value={seoDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoDescription(e.target.value)
          }
        />

        <TextField
          label="SEO Keywords"
          autoComplete="off"
          value={seoKeywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoKeywords(e.target.value)
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
                position,
                url,
                name,
                description,
                brand,
                manufacturer: manufacturerId,
                price,
                valute_id: valute,
                purchase_price: purchase,
                profitabilaty,
                price_postfix: postfix,
                seo_title: seoTitle,
                seo_description: seoDescription,
                seo_keywords: seoKeywords,
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
