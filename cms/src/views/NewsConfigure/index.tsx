import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import API from '../../utils/api'
import { Button, TextField } from '@mui/material'
import { getDate } from '../../utils/date'

export const NewsConfigure = () => {
  const { news_id } = useParams()
  const [newsItem, setNewsItem] = useState<any | null>(null)

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [shortText, setShortText] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('')

  useEffect(() => {
    async function fetch() {
      const newsData = await axios.get(API + '/api/news/' + news_id)

      setNewsItem(newsData.data)
      setTitle(newsData.data.title)
      setText(newsData.data.text)
      setSeoTitle(newsData.data.seo_title)
      setSeoDescription(newsData.data.seo_description)
      setSeoKeywords(newsData.data.seo_keywords)
    }
    fetch()
  }, [news_id])

  return (
    <div className='pd-2'>
      <Button
        variant='outlined'
        color='error'
        onClick={() => navigate('/news')}
        className='mb-2'
      >
        Назад
      </Button>

      <h1>Конфигурация новости</h1>

      <div
        style={{ width: '100%', height: 1, background: '#ddd', marginTop: 16 }}
      />

      <div className='d-flex g-2'>
        {!!newsItem.media.length &&
          newsItem.media.map((mediaItem: any) => (
            <img
              src={mediaItem.src}
              style={{
                width: 300,
                height: 300,
              }}
            />
          ))}
      </div>

      {!!newsItem && (
        <p className='mt-2 mb-4'>Дата: {getDate(Number(newsItem.date))}</p>
      )}

      <div className='fill-width d-flex flex-column g-2 mt-2'>
        <TextField
          value={title}
          label='Название'
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={text}
          label='Текст'
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%' }}
          multiline
        />

        <TextField
          value={shortText}
          label='Короткое описание'
          onChange={(e) => setShortText(e.target.value)}
          style={{ width: '100%' }}
          multiline
          maxRows={8}
        />

        <TextField
          value={seoTitle}
          label='SEO Title'
          onChange={(e) => setSeoTitle(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={seoDescription}
          label='SEO Description'
          onChange={(e) => setSeoDescription(e.target.value)}
          style={{ width: '100%' }}
        />

        <TextField
          value={seoKeywords}
          label='SEO Keywords'
          onChange={(e) => setSeoKeywords(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <Button variant='outlined' color='success' className='mt-2'>
        Сохранить
      </Button>
    </div>
  )
}
