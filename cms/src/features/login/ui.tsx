import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'

import { FormTextField } from '@shared/ui'

import { emptyLoginForm } from './constants'
import { AuthGate, formSubmitted } from './model'

import s from './styles.module.scss'

export const AuthPage = () => {
  const submit = useUnit(formSubmitted)
  const { control, watch, handleSubmit } = useForm({
    defaultValues: emptyLoginForm,
  })
  const onSubmit = handleSubmit(submit)
  const name = watch('name')
  const password = watch('password')
  const canSubmit = !!name.trim() && !!password.trim()

  return (
    <Box className={s.page}>
      <AuthGate />

      <Paper variant='outlined' className={s.card}>
        <Box className={s.header}>
          <Box className={s.badge}>
            <LockOutlinedIcon fontSize='small' />
          </Box>
          <Box>
            <Typography variant='h6' className={s.heading}>
              Авторизация
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Войдите, чтобы управлять CMS
            </Typography>
          </Box>
        </Box>

        <Stack component='form' spacing={2.5} onSubmit={onSubmit} className={s.form}>
          <FormTextField
            control={control}
            name='name'
            textFieldProps={{
              label: 'Логин',
              autoComplete: 'username',
              fullWidth: true,
            }}
          />

          <FormTextField
            control={control}
            name='password'
            textFieldProps={{
              label: 'Пароль',
              type: 'password',
              autoComplete: 'current-password',
              fullWidth: true,
              slotProps: { htmlInput: { maxLength: 32 } },
            }}
          />

          <Button
            type='submit'
            variant='contained'
            size='large'
            disabled={!canSubmit}
            fullWidth
            className={s.submit}
          >
            Войти
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
