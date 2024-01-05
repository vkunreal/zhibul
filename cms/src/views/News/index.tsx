import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../../utils/api'
import { getDate } from '../../utils/date'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { AddNewsItem } from '../../components/AddNewsItem'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/variables/selectors'

export const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const fetchData = async () => {
    const newsData = await axios.get(API + '/api/news')
    setNews(newsData.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="pd-4">
      <h1>Новости</h1>

      <Button
        variant="outlined"
        color="success"
        className="mt-2"
        onClick={() => setIsOpen(true)}
      >
        Добавить новость
      </Button>

      <AddNewsItem
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          fetchData()
        }}
      />

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
                <Button
                  variant="outlined"
                  onClick={() => navigate('/news/' + item.id)}
                >
                  Изменить
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    axios
                      .delete(`${API}/api/news`, {
                        headers: {
                          authorization: token,
                        },
                        data: { id: item.id },
                      })
                      .then(fetchData)
                  }
                >
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
