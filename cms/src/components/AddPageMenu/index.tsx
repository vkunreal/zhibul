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
import { IPage } from '../../interfaces/App'

interface IAddPageMenuProps {
  isOpen: boolean
  title: string
  page?: IPage | null
  onClose: () => void
  addPage: (page: IPage) => void
  change?: boolean
}

const urlList = [
  { url: 'delivery', name: 'Доставка' },
  { url: 'contacts', name: 'Контакты' },
  { url: 'rembaza', name: 'Ремонт пневмоинструмента' },
  { url: 'index', name: 'Главная' },
  { url: 'uslugi', name: 'Услуги' },
  { url: 'katalog', name: 'Каталог' },
  { url: 'arenda_prizepa', name: 'Аренда автоприцепа' },
]

export const AddPageMenu: React.FC<IAddPageMenuProps> = ({
  isOpen,
  title,
  page,
  addPage,
  onClose,
  change,
}) => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('')

  useEffect(() => {
    setUrl(page?.url || '')
    setName(page?.name || '')
    setText(page?.text || '')
    setSeoTitle(page?.seo_title || '')
    setSeoDescription(page?.seo_description || '')
    setSeoKeywords(page?.seo_keywords || '')
  }, [isOpen])

  const handleUrlChange = (e: SelectChangeEvent) => {
    setUrl(e.target.value as string)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        {!change ? (
          <FormControl variant="standard" fullWidth>
            <InputLabel id="change-variable-label">Страница</InputLabel>

            <Select
              labelId="change-variable-label"
              value={url}
              onChange={handleUrlChange}
            >
              {urlList.map(({ url, name }) => (
                <MenuItem key={url} value={url}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p>
            <b>URL:</b> {url}
          </p>
        )}

        <TextField
          label="Название"
          value={name}
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <TextField
          label="Текст"
          value={text}
          autoComplete="off"
          multiline
          maxRows={8}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <TextField
          label="SEO Title"
          value={seoTitle}
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoTitle(e.target.value)
          }
        />
        <TextField
          label="SEO Description"
          value={seoDescription}
          autoComplete="off"
          multiline
          maxRows={8}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoDescription(e.target.value)
          }
        />
        <TextField
          label="SEO Keywords"
          value={seoKeywords}
          autoComplete="off"
          multiline
          maxRows={8}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoKeywords(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              addPage({
                url,
                name,
                text,
                seo_title: seoTitle,
                seo_description: seoDescription,
                seo_keywords: seoKeywords,
              })
              setUrl('')
              setName('')
              setText('')
              setSeoTitle('')
              setSeoDescription('')
              setSeoKeywords('')
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
