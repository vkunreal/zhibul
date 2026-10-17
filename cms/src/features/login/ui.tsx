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
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <AuthGate />

      <Paper
        variant='outlined'
        sx={{
          width: '100%',
          maxWidth: 420,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            bgcolor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <LockOutlinedIcon fontSize='small' />
          </Box>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              Авторизация
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Войдите, чтобы управлять CMS
            </Typography>
          </Box>
        </Box>

        <Stack
          component='form'
          spacing={2.5}
          onSubmit={onSubmit}
          sx={{ p: 3 }}
        >
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
            sx={{ mt: 0.5 }}
          >
            Войти
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
