import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../../utils/api'
import { getDate } from '../../utils/date'
import { Button } from '@mui/material'

export const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      const newsData = await axios.get(API + '/api/news')
      setNews(newsData.data)
    }
    fetch()
  }, [])

  return (
    <div className="pd-4">
      <h1>Новости</h1>

      {!!news.length && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 20,
          }}
        >
          {news.map((item) => (
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: 5,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <h2>{item.title}</h2>

              <p>Дата: {getDate(Number(item.date))}</p>

              <p>URL: /{item.url}</p>

              <p>{item.short_text}</p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: '10px 0',
                  borderTop: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <h3>SEO:</h3>

                <p>Title: {item.seo_title}</p>

                <p>Description: {item.seo_description}</p>

                <p>Keywords: {item.seo_keywords}</p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="outlined">Изменить</Button>
                <Button variant="outlined" color="error">
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
