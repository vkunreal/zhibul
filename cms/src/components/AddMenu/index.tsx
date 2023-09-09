import { useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ICategoryCandidate } from '../../interfaces/Items'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryDB } from '../../store/items/actions'
import { selectToken } from '../../store/variables/selectors'

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
  const [image, setImage] = useState('')
  const [position, setPosition] = useState(0)
  const [description, setDescription] = useState('')
  const [seo_title, setSeoTitle] = useState('')
  const [seo_description, setSeoDescription] = useState('')
  const [seo_keywords, setSeoKeywords] = useState('')

  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [loadedImage, setLoadedImage] = useState<any>(null)

  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleFileLoad = () => fileRef?.current?.click()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fileRef || !e.target.files?.length) return
    const file = Array.from(e.target.files)[0]
    setSelectedImage(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = (e.target as any).result
      setLoadedImage({ name: file.name, result })
    }
    reader.readAsDataURL(file)
  }

  const loadImage = async () => {
    // if (!selectedImage) return
    // const formData = new FormData()
    // formData.append(selectedImage.name, selectedImage)
    // // const res = await fetch(API + '/api/category/image/' + category.id, {
    // //   method: 'POST',
    // //   body: formData,
    // //   headers: {
    // //     authorization: token,
    // //   },
    // // })
    // const data = await res.json()
    // setImage(data.url)
    // setLoadedImage(null)
    // setSelectedImage(null)
  }

  const handleAddCategory = () => {
    const newCategory: { [key: string]: any } = {
      name,
      url,
      position,
      description,
      seo_title,
      seo_description,
      seo_keywords,
    }
    let imageData: any = null
    if (selectedImage) {
      const formData = new FormData()
      formData.append(selectedImage.name, selectedImage)
      imageData = formData
    }
    dispatch(addCategoryDB({ ...newCategory, parent_id }, imageData))
    onClose()
    setLoadedImage(null)
    setSelectedImage(null)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление категории</DialogTitle>

      <DialogContent className='d-flex flex-column g-3'>
        {image && !loadedImage && (
          <img
            src={image}
            style={{ height: 220, width: 220 }}
            alt='Category image'
          />
        )}
        {loadedImage && (
          <img
            src={loadedImage.result}
            style={{
              height: 220,
              width: 220,
              border: '3px solid rgb(0, 180, 0)',
              padding: 2,
            }}
            alt='Loaded image'
          />
        )}

        <input
          type='file'
          className='d-none'
          accept='image/jpeg,image/png'
          ref={fileRef}
          onChange={handleChangeInput}
        />

        <Button variant='outlined' color='warning' onClick={handleFileLoad}>
          Загрузить картинку
        </Button>

        <TextField
          label='Позиция'
          value={position}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPosition(parseInt(e.target.value))
          }
        />

        <TextField
          label='URL'
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />

        <TextField
          label='Название'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextField
          label='Описание'
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          label='SEO Title'
          value={seo_title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoTitle(e.target.value)
          }
        />

        <TextField
          label='SEO Description'
          value={seo_description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoDescription(e.target.value)
          }
        />

        <TextField
          label='SEO Keywords'
          value={seo_keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeoKeywords(e.target.value)
          }
        />

        <div className='d-flex g-2 justify-end'>
          <Button
            variant='outlined'
            color='success'
            onClick={handleAddCategory}
          >
            Добавить
          </Button>

          <Button variant='outlined' color='error' onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
