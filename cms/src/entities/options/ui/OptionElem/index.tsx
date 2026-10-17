import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { changeOptionSubmitted, deleteOptionFx } from '@entities/options'

import { OptionElemProps } from './interfaces'

export const OptionElem: React.FC<OptionElemProps> = ({
  id,
  itemId,
  option,
  onDragStart,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  const [saveOption, removeOption] = useUnit([
    changeOptionSubmitted,
    deleteOptionFx,
  ])
  const { register, control, reset, handleSubmit } = useForm({
    defaultValues: {
      name: option.name,
      value: option.value,
      isSelectMenu: option.isDropdown,
      isShowMenu: option.showMenu,
    },
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
    reset({
      name: option.name,
      value: option.value,
      isSelectMenu: option.isDropdown,
      isShowMenu: option.showMenu,
    })
  }, [option, reset])

  const onDelete = () => {
    removeOption({ id: option.id, itemId })
  }

  return (
    <Paper
      id={id}
      variant='outlined'
      draggable
      onDragStart={(e) => onDragStart(e, option)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, option)}
      sx={{
        overflow: 'hidden',
        cursor: 'grab',
        transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
        '&:active': { cursor: 'grabbing' },
        '&:hover': { borderColor: 'divider' },
      }}
    >
      <Box
        component='form'
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          alignItems: 'stretch',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.disabled',
            flexShrink: 0,
          }}
        >
          <DragIndicatorIcon fontSize='small' />
        </Box>

        <Stack spacing={1.5} sx={{ flex: '1 1 280px', minWidth: 0 }}>
          <Stack
            direction='row'
            spacing={1.5}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <TextField
              size='small'
              label='Название'
              placeholder='Ввести'
              {...register('name')}
              sx={{ flex: '1 1 160px' }}
            />
            <TextField
              size='small'
              label='Значение'
              placeholder='Ввести'
              {...register('value')}
              sx={{ flex: '1 1 160px' }}
            />
          </Stack>

          <Stack
            direction='row'
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Controller
              name='isSelectMenu'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      checked={field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                  label={
                    <Typography variant='body2'>Выпадающее меню</Typography>
                  }
                />
              )}
            />
            <Controller
              name='isShowMenu'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      checked={field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                  label={
                    <Typography variant='body2'>В каталоге</Typography>
                  }
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack
          direction='row'
          spacing={1}
          sx={{
            alignItems: 'flex-end',
            flexShrink: 0,
            ml: { sm: 'auto' },
          }}
        >
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
            onClick={onDelete}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
