import { TextField } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { authApi } from '@/entities/auth/api/authApi'

import { IssuedCode } from '../interfaces'
import s from './styles.module.scss'

export const PhoneStep: FC<{
  onCodeIssued: (phone: string, code: IssuedCode) => void
}> = ({ onCodeIssued }) => {
  const {
    control,
    handleSubmit,
    // formState: { errors, isValid, isSubmitting },
  } = useForm<{ phone: string }>()

  const onSubmit = async ({ phone }: { phone: string }) => {
    const { data } = await authApi.getAuthCode(phone.replace(/[^0-9]/g, ''))

    if (data) onCodeIssued(phone, data)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: 'Телефон обязательно для заполнения',
          validate: (value: string) => {
            const unmasked = value.replace(/\D/g, '')
            return unmasked.length === 12 || 'Введите полный номер'
          },
        }}
        render={({ field, fieldState }) => (
          <PatternFormat
            {...field}
            className={s.field}
            format="+375 (##) ###-##-##"
            mask="_"
            customInput={TextField}
            label="Номер телефона"
            variant="standard"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <button type="submit" className={s.button}>
        Отправить код
      </button>

      <div className={s.legal}>
        <p className={s.note}>
          Продолжая, вы принимаете пользовательское соглашение
        </p>
        <a href="#" className={s.link}>
          Политика обработки персональных данных
        </a>
      </div>
    </form>
  )
}
