import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Button, Chip, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import {
  $newsItem,
  $newsMedia,
  changeNewsFx,
  changeNewsSubmitted,
  deleteNewsMediaFx,
  emptyNewsForm,
  getNewsItemFx,
  toNewsForm,
  uploadNewsMediaFx,
} from '@entities/news'
import { env } from '@shared/config'
import {
  DetailHeader,
  EditableImageGallery,
  RecordState,
  SiteLink,
} from '@shared/ui'
import { filesToFormData, getDate, toPositiveId } from '@shared/utils'

import { NewsForm } from './ui/NewsForm'

import s from './styles.module.scss'

export const NewsConfigure = () => {
  const { news_id } = useParams()
  const navigate = useNavigate()
  const [
    newsItem,
    images,
    loading,
    saving,
    loadNewsItem,
    submitNews,
    uploadMedia,
    removeMedia,
  ] = useUnit([
    $newsItem,
    $newsMedia,
    getNewsItemFx.pending,
    changeNewsFx.pending,
    getNewsItemFx,
    changeNewsSubmitted,
    uploadNewsMediaFx,
    deleteNewsMediaFx,
  ])

  const newsId = toPositiveId(news_id)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyNewsForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitNews(values)
  })

  useEffect(() => {
    if (newsId !== null) loadNewsItem(newsId)
  }, [newsId, loadNewsItem])

  useEffect(() => {
    if (!newsItem || newsId === null || newsItem.id !== newsId) return

    reset(toNewsForm(newsItem))
  }, [newsItem, newsId, reset])

  if (newsId === null || loading || !newsItem || newsItem.id !== newsId) {
    return (
      <RecordState
        className={s.page}
        backLabel='К новостям'
        onBack={() => navigate('/news')}
        missing={newsId === null || (!loading && !newsItem)}
        missingText='Новость не найдена'
      />
    )
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <DetailHeader
        backLabel='К новостям'
        onBack={() => navigate('/news')}
        title={newsItem.title || 'Новость'}
        meta={`/${newsItem.url || '—'}`}
        chips={
          <Chip
            label={getDate(newsItem.date)}
            size='small'
            variant='outlined'
          />
        }
        actions={
          <>
            <SiteLink href={`${env.siteUrl}/news/${newsItem.url}`} />
            <Button
              type='submit'
              form='news-edit-form'
              variant='contained'
              startIcon={<SaveOutlinedIcon />}
              disabled={saving}
            >
              Сохранить
            </Button>
          </>
        }
      />

      <EditableImageGallery
        images={images}
        onUpload={(files) =>
          uploadMedia({
            newsId: newsItem.id,
            formData: filesToFormData(files),
          })
        }
        onRemove={(image) =>
          removeMedia({ newsId: newsItem.id, src: image.src })
        }
      />

      <NewsForm control={control} onSubmit={onSubmit} saving={saving} />
    </Stack>
  )
}
