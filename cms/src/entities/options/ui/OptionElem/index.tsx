import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, Button, Paper, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { changeOptionSubmitted, deleteOptionFx } from '@entities/options'

import { OptionElemProps } from './interfaces'
import { toOptionForm } from './mappers'
import { OptionFields } from './ui/OptionFields'

import s from './styles.module.scss'

export const OptionElem: React.FC<OptionElemProps> = ({
  id,
  itemId,
  option,
  isDragging,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}) => {
  const [saveOption, removeOption] = useUnit([
    changeOptionSubmitted,
    deleteOptionFx,
  ])
  const { register, control, reset, handleSubmit } = useForm({
    defaultValues: toOptionForm(option),
  })

  const onSubmit = handleSubmit((values) => {
    saveOption({
      itemId,
      optionId: option.id,
      name: values.name,
      value: values.value,
      isDropdown: values.isSelectMenu,
      showMenu: values.isShowMenu,
    })
  })

  useEffect(() => {
    reset(toOptionForm(option))
  }, [option, reset])

  return (
    <Paper
      id={id}
      variant='outlined'
      onDragOver={(event) => onDragOver(event, option)}
      onDrop={(event) => onDrop(event, option)}
      className={
        isDragging ? `${s.card} ${s.cardDragging}` : isOver ? `${s.card} ${s.cardOver}` : s.card
      }
    >
      <Box component='form' onSubmit={onSubmit} className={s.form}>
        <Box
          draggable
          aria-label='Перетащить опцию'
          onDragStart={(event) => {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text/plain', String(option.id))
            onDragStart(event, option)
          }}
          onDragEnd={onDragEnd}
          className={s.handle}
        >
          <DragIndicatorIcon fontSize='small' />
        </Box>

        <OptionFields register={register} control={control} />

        <Stack direction='row' spacing={1} className={s.buttons}>
          <Button
            type='submit'
            size='small'
            variant='contained'
            startIcon={<SaveOutlinedIcon />}
          >
            Сохранить
          </Button>
          <Button
            type='button'
            size='small'
            variant='outlined'
            color='error'
            startIcon={<DeleteOutlinedIcon />}
            onClick={() => removeOption({ id: option.id, itemId })}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
