import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { OptionsList } from '../../components/OptionsList'
import { IItem } from '../../interfaces/Items'
import {
  deleteImageDB,
  getItemImages,
  putMainDB,
} from '../../store/items/requests'
import './styles.scss'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/variables/selectors'
import API from '../../utils/api'

interface ILocationItem {
  item: IItem
}

interface IImage {
  src: string
  is_main: number
}

export const Configure: React.FC = () => {
  const item = (useLocation().state as ILocationItem).item
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [images, setImages] = useState<IImage[]>([])
  const [loadedImages, setLoadedImages] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [change, setChange] = useState(false)

  const token = useSelector(selectToken)

  useEffect(() => {
    getItemImages(item?.id || 0).then((imagesDB: IImage[]) =>
      setImages(imagesDB)
    )
  }, [item])

  useEffect(() => {
    setSelectedFiles([])
    setLoadedImages([])
  }, [change])

  const handleOpenFile = () => fileRef?.current?.click()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      return
    }
    const files: File[] = Array.from(e.target?.files || [])
    setSelectedFiles(files)

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return
      }
      const fileName = file.name
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = (e.target as any).result
        setLoadedImages((oldImages) => [
          ...oldImages,
          { name: fileName, result },
        ])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleLoadImage = async () => {
    setChange(false)
    if (!selectedFiles.length) return
    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(selectedFiles[i].name, selectedFiles[i])
    }
    const res = await fetch(API + '/api/item/images/' + (item?.id || 0), {
      method: 'POST',
      body: formData,
      headers: {
        authorization: token,
      },
    })
    const { status } = await res.json()
    if (status) {
      getItemImages(item?.id || 0).then((imagesDB: IImage[]) =>
        setImages(imagesDB)
      )
    }
    setLoadedImages([])
    setSelectedFiles([])
  }

  const deleteLoadImage = (name: string) => {
    setLoadedImages(loadedImages.filter((elem) => elem.name !== name))
    setSelectedFiles(selectedFiles.filter((elem) => elem.name !== name))
  }

  const deleteImage = async (src: string) => {
    await deleteImageDB(src, token)
    await getItemImages(item?.id || 0).then((imagesDB) => setImages(imagesDB))
  }

  const putMain = async (src: string) => {
    await putMainDB(src, token)
    getItemImages(item?.id || 0).then((imagesDB: IImage[]) =>
      setImages(imagesDB)
    )
  }

  return (
    <div className='configure d-flex flex-column g-2 mt-4'>
      <div className='configure-images scroll d-flex g-2'>
        {images.map((image, i) => (
          <div
            className='configure-image d-flex flex-column'
            key={image.src + i}
          >
            {change && (
              <span
                className='configure-image-close'
                onClick={() => deleteImage(image.src)}
              >
                &#10006;
              </span>
            )}
            <img src={image.src} alt='item image' />
            {!image.is_main && change && (
              <Button className='mt-1 mb-1' onClick={() => putMain(image.src)}>
                Сделать главной
              </Button>
            )}
          </div>
        ))}
        {loadedImages.map((image, i) => (
          <div className='configure-image loaded' key={image.name + i}>
            {change && (
              <span
                className='configure-image-close'
                onClick={() => deleteLoadImage(image.name)}
              >
                &#10006;
              </span>
            )}
            <img src={image.result} alt='item image' />
          </div>
        ))}
      </div>

      <div>
        <input
          type='file'
          className='d-none'
          accept='image/jpeg,image/png'
          ref={fileRef}
          onChange={handleChangeInput}
          multiple
        />
        {change ? (
          <div className='d-flex g-1'>
            <Button
              variant='outlined'
              color='success'
              onClick={handleLoadImage}
            >
              Готово
            </Button>
            <Button variant='outlined' color='warning' onClick={handleOpenFile}>
              Загрузить
            </Button>
          </div>
        ) : (
          <Button variant='outlined' onClick={() => setChange(true)}>
            Добавить / удалить картинку
          </Button>
        )}
      </div>

      <h2>{item.name}</h2>
      <p>
        <b>Категория:</b> {item.category_name}
      </p>
      <p>
        <b>Бренд:</b> {item.brand}
      </p>
      <p>
        <b>Производитель:</b> {item.manufacturer}
      </p>
      <p>
        <b>Описание:</b> {item.description}
      </p>
      <p>
        <b>Цена:</b> {item.price}
      </p>

      <OptionsList item_id={item.id || 0} />
    </div>
  )
}
