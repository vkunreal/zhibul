import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import {
  $newsItem,
  $newsMedia,
  changeNewsFx,
  changeNewsSubmitted,
  deleteNewsMediaFx,
  emptyNewsForm,
  getNewsItemFx,
  uploadNewsMediaFx,
} from '@entities/news'
import { env } from '@shared/config'
import { FilePreview } from '@shared/model'
import { FormTextField, RichTextEditor } from '@shared/ui'
import { filesToFormData, getDate, readFileAsDataUrl } from '@shared/utils'

export const NewsConfigure = () => {
  const { news_id } = useParams()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [loadedImages, setLoadedImages] = useState<FilePreview[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [change, setChange] = useState(false)

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

  const newsId = Number(news_id)
  const hasValidId = Number.isFinite(newsId) && newsId > 0

  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyNewsForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitNews(values)
  })

  useEffect(() => {
    if (hasValidId) loadNewsItem(newsId)
  }, [hasValidId, newsId, loadNewsItem])

  useEffect(() => {
    if (!newsItem || newsItem.id !== newsId) return

    reset({
      url: newsItem.url,
      title: newsItem.title,
      text: newsItem.text,
      shortText: newsItem.shortText,
      seoTitle: newsItem.seoTitle,
      seoDescription: newsItem.seoDescription,
      seoKeywords: newsItem.seoKeywords,
    })
  }, [newsItem, newsId, reset])

  useEffect(() => {
    setSelectedFiles([])
    setLoadedImages([])
  }, [change])

  const handleOpenFile = () => fileRef?.current?.click()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) return

    const files: File[] = Array.from(e.target.files)
    setSelectedFiles(files)

    files.forEach(async (file) => {
      if (!file.type.match('image')) return

      const src = await readFileAsDataUrl(file)
      setLoadedImages((oldImages) => [...oldImages, { name: file.name, src }])
    })
  }

  const handleLoadImage = () => {
    setChange(false)
    if (!newsItem || !selectedFiles.length) return
    uploadMedia({
      newsId: newsItem.id,
      formData: filesToFormData(selectedFiles),
    })
    setLoadedImages([])
    setSelectedFiles([])
  }

  const deleteLoadImage = (name: string) => {
    setLoadedImages((prev) => prev.filter((elem) => elem.name !== name))
    setSelectedFiles((prev) => prev.filter((elem) => elem.name !== name))
  }

  const deleteImage = (src: string) => {
    if (!newsItem) return
    removeMedia({ newsId: newsItem.id, src })
  }

  if (!hasValidId || loading || !newsItem || newsItem.id !== newsId) {
    return (
      <Stack spacing={2.5} sx={{ p: 3, maxWidth: 960 }}>
        <Button
          size='small'
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate('/news')}
          sx={{ alignSelf: 'flex-start', color: 'text.secondary' }}
        >
          К новостям
        </Button>
        {!hasValidId || (!loading && !newsItem) ? (
          <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
            <Typography color='text.secondary'>Новость не найдена</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
    )
  }

  const siteUrl = `${env.siteUrl}/news/${newsItem.url}`

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 960 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Button
            size='small'
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => navigate('/news')}
            sx={{ mb: 1, color: 'text.secondary' }}
          >
            К новостям
          </Button>
          <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
            {newsItem.title || 'Новость'}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mt: 0.5, fontFamily: 'ui-monospace, monospace' }}
          >
            /{newsItem.url || '—'}
          </Typography>
          <Stack
            direction='row'
            spacing={0.75}
            useFlexGap
            sx={{ mt: 1.25, flexWrap: 'wrap' }}
          >
            <Chip
              label={getDate(newsItem.date)}
              size='small'
              variant='outlined'
            />
          </Stack>
        </Box>

        <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button
            variant='outlined'
            startIcon={<OpenInNewOutlinedIcon />}
            href={siteUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            Открыть на сайте
          </Button>
          <Button
            type='submit'
            form='news-edit-form'
            variant='contained'
            startIcon={<SaveOutlinedIcon />}
            disabled={saving}
          >
            Сохранить
          </Button>
        </Stack>
      </Box>

      <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2.5,
            py: 1.5,
            bgcolor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            Изображения
          </Typography>
          <input
            type='file'
            hidden
            accept='image/jpeg,image/png'
            ref={fileRef}
            onChange={handleChangeInput}
            multiple
          />
          {change ? (
            <Stack direction='row' spacing={1}>
              <Button
                size='small'
                variant='contained'
                color='success'
                onClick={handleLoadImage}
              >
                Готово
              </Button>
              <Button size='small' variant='outlined' onClick={handleOpenFile}>
                Загрузить
              </Button>
              <Button
                size='small'
                color='inherit'
                onClick={() => setChange(false)}
              >
                Отмена
              </Button>
            </Stack>
          ) : (
            <Button
              size='small'
              variant='outlined'
              onClick={() => setChange(true)}
            >
              Изменить
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 2.5,
            overflowX: 'auto',
            minHeight: 200,
          }}
        >
          {images.length === 0 && loadedImages.length === 0 ? (
            <Typography color='text.secondary' sx={{ py: 4, mx: 'auto' }}>
              Нет изображений — нажмите «Изменить», чтобы загрузить
            </Typography>
          ) : null}

          {images.map((image, i) => (
            <Paper
              key={image.src + i}
              variant='outlined'
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: 200,
                overflow: 'hidden',
              }}
            >
              {change && (
                <IconButton
                  size='small'
                  onClick={() => deleteImage(image.src)}
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    zIndex: 1,
                    bgcolor: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                  }}
                >
                  <CloseOutlinedIcon fontSize='small' />
                </IconButton>
              )}
              <Box
                component='img'
                src={image.src}
                alt=''
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                }}
              />
            </Paper>
          ))}

          {loadedImages.map((image, i) => (
            <Paper
              key={image.name + i}
              variant='outlined'
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: 200,
                overflow: 'hidden',
                borderColor: 'success.main',
              }}
            >
              {change && (
                <IconButton
                  size='small'
                  onClick={() => deleteLoadImage(image.name)}
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    zIndex: 1,
                    bgcolor: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                  }}
                >
                  <CloseOutlinedIcon fontSize='small' />
                </IconButton>
              )}
              <Box
                component='img'
                src={image.src}
                alt=''
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ px: 1, py: 0.75 }}>
                <Chip
                  size='small'
                  color='success'
                  label='Новое'
                  sx={{ height: 24 }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>

      <Box component='form' id='news-edit-form' onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
            <Box
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: 'grey.50',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                Содержание
              </Typography>
            </Box>

            <Stack spacing={2.5} sx={{ p: 2.5 }}>
              <FormTextField
                control={control}
                name='title'
                textFieldProps={{
                  label: 'Название',
                  autoComplete: 'off',
                  fullWidth: true,
                }}
              />
              <Controller
                name='text'
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    label='Текст'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <FormTextField
                control={control}
                name='shortText'
                textFieldProps={{
                  label: 'Короткое описание',
                  autoComplete: 'off',
                  fullWidth: true,
                  multiline: true,
                  minRows: 3,
                  maxRows: 8,
                }}
              />
            </Stack>
          </Paper>

          <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
            <Box
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: 'grey.50',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                SEO
              </Typography>
            </Box>

            <Stack spacing={2.5} sx={{ p: 2.5 }}>
              <FormTextField
                control={control}
                name='seoTitle'
                textFieldProps={{
                  label: 'Title',
                  autoComplete: 'off',
                  fullWidth: true,
                }}
              />
              <FormTextField
                control={control}
                name='seoDescription'
                textFieldProps={{
                  label: 'Description',
                  autoComplete: 'off',
                  fullWidth: true,
                  multiline: true,
                  minRows: 2,
                  maxRows: 6,
                }}
              />
              <FormTextField
                control={control}
                name='seoKeywords'
                textFieldProps={{
                  label: 'Keywords',
                  autoComplete: 'off',
                  fullWidth: true,
                }}
              />
            </Stack>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type='submit'
              variant='contained'
              startIcon={<SaveOutlinedIcon />}
              disabled={saving}
            >
              Сохранить
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
