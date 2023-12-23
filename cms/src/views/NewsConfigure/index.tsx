import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import API from '../../utils/api'
import { TextField } from '@mui/material'

export const NewsConfigure = () => {
  const { news_id } = useParams()
  const [newsItem, setNewsItem] = useState<any | null>(null)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    async function fetch() {
      const newsData = await axios.get(API + '/api/news/' + news_id)

      setNewsItem(newsData.data)
      setTitle(newsData.data.title)
      setText(newsData.data.text)
    }
    fetch()
  }, [news_id])

  return (
    <div className="pd-2">
      <h1>Конфигурация новости</h1>

      <div
        style={{ width: '100%', height: 1, background: '#ddd', marginTop: 16 }}
      />

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
          maxRows={16}
        />
      </div>
    </div>
  )
}
