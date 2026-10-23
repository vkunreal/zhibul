import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { DetailField, Panel, SeoDetails } from '@shared/ui'
import { getDate } from '@shared/utils'

import { NewsCardProps } from './interfaces'

import s from './styles.module.scss'

export const NewsCard = ({ news, onEdit, onDelete }: NewsCardProps) => {
  return (
    <Panel
      align='start'
      title={
        <Box>
          <Typography variant='subtitle1' className={s.title}>
            {news.title || 'Без заголовка'}
          </Typography>
          <Typography variant='body2' color='text.secondary' className={s.date}>
            {getDate(news.date)}
          </Typography>
        </Box>
      }
      actions={
        <>
          <Tooltip title='Изменить'>
            <IconButton size='small' onClick={onEdit}>
              <EditOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Удалить'>
            <IconButton size='small' color='error' onClick={onDelete}>
              <DeleteOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <Stack spacing={2} divider={<Divider />}>
        <DetailField label='Краткий текст'>{news.shortText}</DetailField>
        <DetailField label='URL'>{`/${news.url}`}</DetailField>
        <SeoDetails
          title={news.seoTitle}
          description={news.seoDescription}
          keywords={news.seoKeywords}
        />
      </Stack>
    </Panel>
  )
}
