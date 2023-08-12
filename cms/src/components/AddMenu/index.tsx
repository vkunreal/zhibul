import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ICategoryCandidate } from '../../interfaces/Items'

interface IAddMenuProps {
  isOpen: boolean
  parent_id: number | null
  onClose: () => void
  addCategory: (category: ICategoryCandidate) => void
}

export const AddMenu: React.FC<IAddMenuProps> = ({
  isOpen,
  parent_id,
  onClose,
  addCategory,
}) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [position, setPosition] = useState(0)
  const [description, setDescription] = useState('')
  const [seo_title, setSeoTitle] = useState('')
  const [seo_description, setSeoDescription] = useState('')
  const [seo_keywords, setSeoKeywords] = useState('')

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление категории</DialogTitle>

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
                name,
                url,
                position,
                description,
                seo_title,
                seo_description,
                seo_keywords,
              }
              addCategory(newCategory)
            }}
          >
            Добавить
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
