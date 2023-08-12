import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ICategory } from '../../interfaces/Items'

interface IChangeCategoryMenuProps {
  category: ICategory
  isOpen: boolean
  saveCategory: (category: ICategory) => void
  onClose: () => void
}

export const ChangeCategoryMenu: React.FC<IChangeCategoryMenuProps> = ({
  isOpen,
  category,
  saveCategory,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [position, setPosition] = useState(0)
  const [description, setDescription] = useState('')
  const [seo_title, setSeoTitle] = useState('')
  const [seo_description, setSeoDescription] = useState('')
  const [seo_keywords, setSeoKeywords] = useState('')

  useEffect(() => {
    setName(category?.name)
    setUrl(category?.url)
    setPosition(category?.position)
    setDescription(category?.description)
    setSeoTitle(category?.seo_title)
    setSeoDescription(category?.seo_description)
    setSeoKeywords(category?.seo_keywords)
  }, [category])

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Изменение категории</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <TextField
          label="Позиция"
          value={position}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPosition(parseInt(e.target.value))
          }
        />

        <TextField
          label="URL"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />

        <TextField
          label="Название"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextField
          label="Описание"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          label="SEO Title"
          value={seo_title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoTitle(e.target.value)
          }
        />

        <TextField
          label="SEO Description"
          value={seo_description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoDescription(e.target.value)
          }
        />

        <TextField
          label="SEO Keywords"
          value={seo_keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoKeywords(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              const newCategory = {
                ...category,
                name,
                url,
                position,
                description,
                seo_title,
                seo_description,
                seo_keywords,
              }
              saveCategory(newCategory)
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
