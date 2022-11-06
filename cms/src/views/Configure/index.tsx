import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { IItem } from '../../interfaces/Items'
import { getItemImages } from '../../store/items/requests'
import './styles.scss'

interface ILocationItem {
  item: IItem
}

export const Configure: React.FC = () => {
  const item = (useLocation().state as ILocationItem).item
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    getItemImages(item?.id || 0).then((imagesDB) => setImages(imagesDB))
  }, [item])

  useEffect(() => {
    console.log('images', loadedImages)
  }, [loadedImages])

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
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = (e.target as any).result
        setLoadedImages((oldImages) => [...oldImages, result])
      }
      reader.readAsDataURL(file)
    })
    // const selectedFile = files[0]
    // const reader = new FileReader()

    // reader.onload = (e) => {
    //   const result = (e.target as any).result
    //   setLoadedImages((oldImages) => [...oldImages, result])
    // }
    // reader.readAsDataURL(selectedFile)
    // const formData = new FormData()
    // formData.append('file', selectedFile)
    // const res = await fetch('/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // const { status } = await res.json()
    // if (status) {

    // }
  }

  const handleLoadImage = async () => {
    setChange(false)
    const formData = new FormData()
    // formData.append('files', selectedFiles)
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(selectedFiles[i].name, selectedFiles[i])
    }
    const res = await fetch('/api/item/images/' + (item?.id || 0), {
      method: 'POST',
      body: formData,
    })
    const { status } = await res.json()
    if (status) {
      setImages((old) => [...old, ...loadedImages])
      setLoadedImages([])
    }
    // const imagesJSON = JSON.stringify(loadedImages)
    // postLoadedImages(imagesJSON)
  }

  const deleteLoadImage = (image: string) => {
    setLoadedImages(loadedImages.filter((elem) => elem !== image))
  }

  return (
    <div className="configure d-flex flex-column g-2 mt-4">
      <div className="configure-images scroll d-flex g-2">
        {images.map((image, i) => (
          <div className="configure-image" key={image + i}>
            {change && <span className="configure-image-close">&#10006;</span>}
            <img src={image} alt="item image" />
          </div>
        ))}
        {loadedImages.map((image, i) => (
          <div className="configure-image loaded" key={image + i}>
            {change && (
              <span
                className="configure-image-close"
                onClick={() => deleteLoadImage(image)}
              >
                &#10006;
              </span>
            )}
            <img src={image} alt="item image" />
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          className="d-none"
          accept="image/jpeg,image/png"
          ref={fileRef}
          onChange={handleChangeInput}
          multiple
        />
        {change ? (
          <div className="d-flex g-1">
            <Button
              variant="outlined"
              color="success"
              onClick={handleLoadImage}
            >
              Сохранить
            </Button>
            <Button variant="outlined" color="warning" onClick={handleOpenFile}>
              Загрузить
            </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={() => setChange(true)}>
            Изменить
          </Button>
        )}
      </div>

      <h2>{item.name}</h2>
      <p>
        <b>Категория:</b> {item.category}
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
    </div>
  )
}
