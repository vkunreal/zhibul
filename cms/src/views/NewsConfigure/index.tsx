import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import API, { DOMAIN } from '../../utils/api'
import { Button, TextField } from '@mui/material'
import { getDate } from '../../utils/date'
import { selectToken } from '../../store/variables/selectors'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export const NewsConfigure = () => {
  const { news_id } = useParams()
  const [newsItem, setNewsItem] = useState<any | null>(null)

  const navigate = useNavigate()

  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [shortText, setShortText] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('')

  const [images, setImages] = useState<any[]>([])
  const [loadedImages, setLoadedImages] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [change, setChange] = useState(false)

  const token = useSelector(selectToken)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const fetchData = async () => {
    const newsData = await axios.get(API + '/api/news/id/' + news_id)

    setNewsItem(newsData.data)
    setImages(newsData.data.media)

    setUrl(newsData.data.url)
    setTitle(newsData.data.title)
    setText(newsData.data.text)
    setSeoTitle(newsData.data.seo_title)
    setSeoDescription(newsData.data.seo_description)
    setSeoKeywords(newsData.data.seo_keywords)
  }

  useEffect(() => {
    fetchData()
  }, [news_id])

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
        setLoadedImages((oldImages: any) => [
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
    const res = await fetch(API + '/api/news/media/' + (newsItem.id || 0), {
      method: 'POST',
      body: formData,
      headers: {
        authorization: token,
      },
    })
    const { status } = await res.json()
    if (status) {
      // getItemImages(item?.id || 0).then((imagesDB: IImage[]) =>
      //   setImages(imagesDB)
      // )
      await axios
        .get(`${API}/api/news/media/${newsItem.id}`)
        .then(({ data }) => {
          setImages(data)
        })
    }
    setLoadedImages([])
    setSelectedFiles([])
  }

  const deleteLoadImage = (name: string) => {
    setLoadedImages(loadedImages.filter((elem) => elem.name !== name))
    setSelectedFiles(selectedFiles.filter((elem) => elem.name !== name))
  }

  const deleteImage = async (src: string) => {
    // await deleteImageDB(src, token)
    await axios.delete(`${API}/api/news/media/`, {
      headers: {
        authorization: token,
      },
      data: { src },
    })
    await axios.get(`${API}/api/news/media/${newsItem.id}`).then(({ data }) => {
      setImages(data)
    })
  }

  // const putMain = async (src: string) => {
  //   await putMainDB(src, token)
  //   getItemImages(item?.id || 0).then((imagesDB: IImage[]) =>
  //     setImages(imagesDB)
  //   )
  // }

  const saveNewsItem = async () => {
    const data = {
      url,
      title,
      text,
      short_text: shortText,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_keywords: seoKeywords,
    }

    await axios.put(`${API}/api/news/`, data, {
      headers: {
        authorization: token,
      },
    })
    await fetchData()
  }

  return (
    <div className="pd-2">
      <Button
        variant="outlined"
        color="error"
        onClick={() => navigate('/news')}
        className="mb-2"
      >
        Назад
      </Button>

      <h1>Конфигурация новости</h1>

      <div
        style={{ width: '100%', height: 1, background: '#ddd', marginTop: 16 }}
      />

      <div className="configure-images scroll d-flex g-2 mt-2">
        {images.map((image, i) => (
          <div
            className="configure-image d-flex flex-column"
            key={image.src + i}
          >
            {change && (
              <span
                className="configure-image-close"
                onClick={() => deleteImage(image.src)}
              >
                &#10006;
              </span>
            )}
            <img src={image.src} alt="item image" />
            {/* {!image.is_main && change && (
              <Button className="mt-1 mb-1" onClick={() => putMain(image.src)}>
                Сделать главной
              </Button>
            )} */}
          </div>
        ))}
        {loadedImages.map((image, i) => (
          <div className="configure-image loaded" key={image.name + i}>
            {change && (
              <span
                className="configure-image-close"
                onClick={() => deleteLoadImage(image.name)}
              >
                &#10006;
              </span>
            )}
            <img src={image.result} alt="item image" />
          </div>
        ))}
      </div>

      <div className="mt-2 mb-2">
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
              Готово
            </Button>
            <Button variant="outlined" color="warning" onClick={handleOpenFile}>
              Загрузить
            </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={() => setChange(true)}>
            Добавить / удалить картинку
          </Button>
        )}
      </div>

      <a href={`${DOMAIN}/news/${newsItem?.url}`} target="_blank">
        Открыть на сайте
      </a>

      {!!newsItem && (
        <p className="mt-2 mb-4">Дата: {getDate(Number(newsItem.date))}</p>
      )}

      <div className="fill-width d-flex flex-column g-2 mt-2">
        <TextField
          value={title}
          label="Название"
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={text}
          label="Текст"
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%' }}
          multiline
        />

        <TextField
          value={shortText}
          label="Короткое описание"
          onChange={(e) => setShortText(e.target.value)}
          style={{ width: '100%' }}
          multiline
          maxRows={8}
        />

        <TextField
          value={seoTitle}
          label="SEO Title"
          onChange={(e) => setSeoTitle(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={seoDescription}
          label="SEO Description"
          onChange={(e) => setSeoDescription(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={seoKeywords}
          label="SEO Keywords"
          onChange={(e) => setSeoKeywords(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <Button
        variant="outlined"
        color="success"
        className="mt-2"
        onClick={() => saveNewsItem()}
      >
        Сохранить
      </Button>
    </div>
  )
}
