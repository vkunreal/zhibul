import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import {
  $configureItem,
  $configureItemLoading,
  $itemImages,
  configureItemRequested,
  deleteItemImageFx,
  getItemImagesFx,
  setMainItemImageFx,
  uploadItemImagesFx,
} from '@entities/items'
import { $valutes, valutesRequested } from '@entities/valutes'
import { env } from '@shared/config'
import { FilePreview } from '@shared/model'
import { filesToFormData, readFileAsDataUrl } from '@shared/utils'
import { FileManager } from '@widgets/item-files/FileManager'
import { OptionsList } from '@widgets/item-options/OptionsList'

import { ItemProperty } from './ItemProperty'

export const Configure: React.FC = () => {
  const { item_id } = useParams()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [loadedImages, setLoadedImages] = useState<FilePreview[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [change, setChange] = useState(false)
  const [
    item,
    loading,
    images,
    valutes,
    loadItem,
    loadImages,
    loadValutes,
    uploadImages,
    setMainImage,
    removeImage,
  ] = useUnit([
    $configureItem,
    $configureItemLoading,
    $itemImages,
    $valutes,
    configureItemRequested,
    getItemImagesFx,
    valutesRequested,
    uploadItemImagesFx,
    setMainItemImageFx,
    deleteItemImageFx,
  ])

  const itemId = Number(item_id)
  const hasValidId = Number.isFinite(itemId) && itemId > 0

  useLayoutEffect(() => {
    if (!hasValidId) return
    loadItem(itemId)
  }, [hasValidId, itemId, loadItem])

  useEffect(() => {
    if (!item || item.id !== itemId) return
    loadImages(item.id)
  }, [item, itemId, loadImages])

  useEffect(() => {
    setSelectedFiles([])
    setLoadedImages([])
  }, [change])

  useEffect(() => {
    loadValutes()
  }, [loadValutes])

  const handleOpenFile = () => fileRef?.current?.click()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      return
    }
    const files: File[] = Array.from(e.target?.files || [])
    setSelectedFiles(files)

    files.forEach(async (file) => {
      if (!file.type.match('image')) return

      const src = await readFileAsDataUrl(file)
      setLoadedImages((oldImages) => [...oldImages, { name: file.name, src }])
    })
  }

  const handleLoadImage = () => {
    if (!item) return
    setChange(false)
    if (!selectedFiles.length) return
    uploadImages({ itemId: item.id, formData: filesToFormData(selectedFiles) })
    setLoadedImages([])
    setSelectedFiles([])
  }

  const deleteLoadImage = (name: string) => {
    setLoadedImages(loadedImages.filter((elem) => elem.name !== name))
    setSelectedFiles(selectedFiles.filter((elem) => elem.name !== name))
  }

  const deleteImage = (src: string) => {
    if (!item) return
    removeImage({ itemId: item.id, src })
  }

  const putMain = (src: string) => {
    if (!item) return
    setMainImage({ itemId: item.id, src })
  }

  if (!hasValidId || loading || !item || item.id !== itemId) {
    return (
      <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
        <Button
          size='small'
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate('/items')}
          sx={{ alignSelf: 'flex-start', color: 'text.secondary' }}
        >
          К товарам
        </Button>
        {!hasValidId || (!loading && !item) ? (
          <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
            <Typography color='text.secondary'>Товар не найден</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>
    )
  }

  const siteUrl = `${env.siteUrl}/menu/${item.categoryUrl}/${item.url}`
  const valuteTitle = valutes.find((v) => v.id === item.valuteId)?.title

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
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
            onClick={() =>
              navigate(
                item.categoryUrl ? `/items/${item.categoryUrl}` : '/items',
              )
            }
            sx={{ mb: 1, color: 'text.secondary' }}
          >
            К товарам
          </Button>
          <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
            {item.name || 'Товар'}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mt: 0.5,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {[item.code, item.url ? `/${item.url}` : '']
              .filter(Boolean)
              .join(' · ') || '—'}
          </Typography>
          <Stack
            direction='row'
            spacing={0.75}
            useFlexGap
            sx={{ mt: 1.25, flexWrap: 'wrap' }}
          >
            <Chip
              label={item.isActive ? 'Активен' : 'Скрыт'}
              size='small'
              color={item.isActive ? 'success' : 'default'}
              variant={item.isActive ? 'filled' : 'outlined'}
            />
            <Chip
              label={item.isOrderOnly ? 'Под заказ' : 'В наличии'}
              size='small'
              color={item.isOrderOnly ? 'warning' : 'default'}
              variant='outlined'
            />
          </Stack>
        </Box>

        <Button
          variant='outlined'
          startIcon={<OpenInNewOutlinedIcon />}
          href={siteUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          Открыть на сайте
        </Button>
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
              <Box
                sx={{
                  px: 1,
                  py: 0.75,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 0.5,
                }}
              >
                {image.isMain ? (
                  <Chip
                    size='small'
                    color='primary'
                    icon={<StarOutlinedIcon />}
                    label='Главная'
                    sx={{ height: 24 }}
                  />
                ) : change ? (
                  <Tooltip title='Сделать главной'>
                    <IconButton size='small' onClick={() => putMain(image.src)}>
                      <StarOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Typography variant='caption' color='text.disabled'>
                    —
                  </Typography>
                )}
              </Box>
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
            Свойства
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ p: 2.5 }} divider={<Divider />}>
          <ItemProperty label='Категория'>{item.categoryName}</ItemProperty>
          <ItemProperty label='Бренд'>{item.brand}</ItemProperty>
          <ItemProperty label='Производитель'>{item.manufacturer}</ItemProperty>
          <ItemProperty label='Описание'>{item.description}</ItemProperty>
          <ItemProperty label='Цена на сайте'>{item.displayPrice}</ItemProperty>
          <ItemProperty label='Цена'>{item.price}</ItemProperty>
          <ItemProperty label='Валюта'>{valuteTitle}</ItemProperty>
          <ItemProperty label='Закупочная цена'>
            {item.purchasePrice}
          </ItemProperty>
          <ItemProperty label='Рентабельность'>
            {item.profitability}
          </ItemProperty>
          <ItemProperty label='Постфикс цены'>{item.pricePostfix}</ItemProperty>
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
            Файлы
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <FileManager itemId={item.id} />
        </Box>
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
            Опции
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <OptionsList itemId={item.id} />
        </Box>
      </Paper>
    </Stack>
  )
}
