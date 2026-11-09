import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useModal } from '@app/contexts/ModalContext'
import { $news, deleteNewsFx, getNewsFx, newsRequested } from '@entities/news'
import { News as NewsItem } from '@entities/news/model'
import { Confirm, FetchState, PageHeader } from '@shared/ui'

import { NewsCard } from './ui/NewsCard'

import s from './styles.module.scss'

export const News: React.FC = () => {
  const [deletedNews, setDeletedNews] = useState<NewsItem | null>(null)
  const { open } = useModal()
  const navigate = useNavigate()

  const [news, loading, loadNews, removeNews] = useUnit([
    $news,
    getNewsFx.pending,
    newsRequested,
    deleteNewsFx,
  ])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const confirmDelete = () => {
    if (!deletedNews) return
    removeNews(deletedNews.id)
    setDeletedNews(null)
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Новости'
        subtitle='Публикации и SEO-данные для раздела новостей'
        actions={
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => open('newsModal', {})}
          >
            Добавить
          </Button>
        }
      />

      <FetchState
        loading={loading}
        empty={news.length === 0}
        emptyText='Пока нет новостей — создайте первую'
      >
        <Stack spacing={2}>
          {news.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onEdit={() => navigate('/news/' + item.id)}
              onDelete={() => setDeletedNews(item)}
            />
          ))}
        </Stack>
      </FetchState>

      <Confirm
        isOpen={deletedNews !== null}
        onClose={() => setDeletedNews(null)}
        title={`Удалить новость «${deletedNews?.title || deletedNews?.url || ''}»?`}
      >
        <Button variant='outlined' color='success' onClick={confirmDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
