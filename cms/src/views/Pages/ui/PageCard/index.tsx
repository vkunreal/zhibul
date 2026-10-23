import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'

import { DetailField, Panel, SeoDetails } from '@shared/ui'

import { PageCardProps } from './interfaces'

import s from './styles.module.scss'

export const PageCard = ({ page, onEdit, onDelete }: PageCardProps) => {
  return (
    <Panel
      title={
        <Typography variant='body2' color='primary' className={s.url}>
          /{page.url}
        </Typography>
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
        <DetailField label='Название'>{page.name}</DetailField>
        <DetailField label='Текст'>{page.text}</DetailField>
        <SeoDetails
          title={page.seoTitle}
          description={page.seoDescription}
          keywords={page.seoKeywords}
        />
      </Stack>
    </Panel>
  )
}
