import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { selectToken } from '../../store/variables/selectors'
import API from '../../utils/api'
import axios from 'axios'
import { useSelector } from 'react-redux'

interface IAddMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const AddNewsItem: React.FC<IAddMenuProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [shortText, setShortText] = useState('')
  const [seo_title, setSeoTitle] = useState('')
  const [seo_description, setSeoDescription] = useState('')
  const [seo_keywords, setSeoKeywords] = useState('')

  const token = useSelector(selectToken)

  const handleAddNewsItem = async () => {
    const data = {
      url,
      title,
      text,
      short_text: shortText,
      seo_title,
      seo_description,
      seo_keywords,
    }

    await axios
      .post(`${API}/api/news`, data, {
        headers: {
          authorization: token,
        },
      })
      .then(onClose)

    setUrl('')
    setTitle('')
    setText('')
    setShortText('')
    setSeoTitle('')
    setSeoDescription('')
    setSeoKeywords('')
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление новости</DialogTitle>

      <DialogContent className="d-flex flex-column g-3 pt-1">
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
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />

        <TextField
          label="Текст"
          autoComplete="off"
          value={text}
          multiline
          maxRows={8}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />

        <TextField
          label="Короткий текст"
          autoComplete="off"
          value={shortText}
          multiline
          maxRows={8}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setShortText(e.target.value)
          }
        />

        <TextField
          label="SEO Title"
          autoComplete="off"
          value={seo_title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoTitle(e.target.value)
          }
        />

        <TextField
          label="SEO Description"
          autoComplete="off"
          value={seo_description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoDescription(e.target.value)
          }
        />

        <TextField
          label="SEO Keywords"
          autoComplete="off"
          value={seo_keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoKeywords(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={handleAddNewsItem}
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
