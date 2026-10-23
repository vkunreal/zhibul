import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'

import { OptionFieldsProps } from './interfaces'

import s from './styles.module.scss'

export const OptionFields = ({ register, control }: OptionFieldsProps) => {
  return (
    <Stack spacing={1.5} className={s.fields}>
      <Stack direction='row' spacing={1.5} useFlexGap className={s.fieldRow}>
        <TextField
          size='small'
          label='Название'
          placeholder='Ввести'
          {...register('name')}
          className={s.field}
        />
        <TextField
          size='small'
          label='Значение'
          placeholder='Ввести'
          {...register('value')}
          className={s.field}
        />
      </Stack>

      <Stack direction='row' spacing={1} useFlexGap className={s.checkRow}>
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
              label={<Typography variant='body2'>Выпадающее меню</Typography>}
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
              label={<Typography variant='body2'>В каталоге</Typography>}
            />
          )}
        />
      </Stack>
    </Stack>
  )
}
