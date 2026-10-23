import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'

import { DetailField, Panel } from '@shared/ui'

import { VariableCardProps } from './interfaces'

import s from './styles.module.scss'

export const VariableCard = ({
  variable,
  label,
  onEdit,
  onDelete,
}: VariableCardProps) => {
  return (
    <Panel
      align='start'
      title={
        <Box>
          <Typography variant='subtitle1' className={s.title}>
            {label}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            className={s.name}
          >
            {variable.name}
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
      <DetailField label='Значение'>{variable.value}</DetailField>
    </Panel>
  )
}
