import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Button, Stack } from '@mui/material'

import { OptionsToolbarProps } from './interfaces'

import s from './styles.module.scss'

export const OptionsToolbar = ({
  onAdd,
  canDeleteAll,
  onDeleteAll,
  orderChanged,
  onSave,
  onCancel,
}: OptionsToolbarProps) => {
  return (
    <Stack direction='row' spacing={1} className={s.root}>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAdd}>
        Добавить опцию
      </Button>
      {canDeleteAll && (
        <Button
          variant='outlined'
          color='error'
          startIcon={<DeleteOutlinedIcon />}
          onClick={onDeleteAll}
        >
          Удалить все опции
        </Button>
      )}
      {orderChanged && (
        <>
          <Button variant='outlined' color='success' onClick={onSave}>
            Сохранить порядок
          </Button>
          <Button variant='outlined' color='inherit' onClick={onCancel}>
            Отменить
          </Button>
        </>
      )}
    </Stack>
  )
}
