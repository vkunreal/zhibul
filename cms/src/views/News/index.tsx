import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { $news, deleteNewsFx, newsRequested } from '@entities/news'
import { News as NewsItem } from '@entities/news/model'
import { AddNewsItem } from '@features/create-news'
import { Confirm } from '@shared/ui'
import { getDate } from '@shared/utils'

const Field = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <Box>
    <Typography
      variant='caption'
      color='text.secondary'
      sx={{ display: 'block', mb: 0.5, letterSpacing: 0.2 }}
    >
      {label}
    </Typography>
    <Typography
      variant='body2'
      sx={{
        color: value ? 'text.primary' : 'text.disabled',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        lineHeight: 1.55,
      }}
    >
      {value || '—'}
    </Typography>
  </Box>
)

export const News: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [deletedNews, setDeletedNews] = useState<NewsItem | null>(null)

  const [news, loadNews, removeNews] = useUnit([
    $news,
    newsRequested,
    deleteNewsFx,
  ])

  const navigate = useNavigate()

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const confirmDelete = () => {
    if (!deletedNews) return
    removeNews(deletedNews.id)
    setDeletedNews(null)
  }

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
            Новости
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Публикации и SEO-данные для раздела новостей
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsOpen(true)}
        >
          Добавить
        </Button>
      </Box>

      <AddNewsItem isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {news.length === 0 ? (
        <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
          <Typography color='text.secondary'>
            Пока нет новостей — создайте первую
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {news.map((item) => (
            <Paper key={item.id} variant='outlined' sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: 2.5,
                  py: 1.75,
                  bgcolor: 'grey.50',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 600, lineHeight: 1.35 }}
                  >
                    {item.title || 'Без заголовка'}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mt: 0.5 }}
                  >
                    {getDate(item.date)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.25, flexShrink: 0 }}>
                  <Tooltip title='Изменить'>
                    <IconButton
                      size='small'
                      onClick={() => navigate('/news/' + item.id)}
                    >
                      <EditOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Удалить'>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => setDeletedNews(item)}
                    >
                      <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Stack spacing={2} sx={{ p: 2.5 }} divider={<Divider />}>
                <Field label='Краткий текст' value={item.shortText} />
                <Field label='URL' value={`/${item.url}`} />
                <Stack spacing={1.5}>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 600, letterSpacing: 0.2 }}
                  >
                    SEO
                  </Typography>
                  <Field label='Title' value={item.seoTitle} />
                  <Field label='Description' value={item.seoDescription} />
                  <Field label='Keywords' value={item.seoKeywords} />
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

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
