import { TextField } from '@mui/material'
import { useUnit } from 'effector-react'
import { FC, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { useAutoFocus } from '@/shared/lib'

import { PHONE_RULES } from './constants'
import { PhoneFormValues } from './interfaces'
import s from './styles.module.scss'

import { phoneSubmitted } from '../../../model'

export const PhoneStep: FC = () => {
  const submitPhone = useUnit(phoneSubmitted)
  const { control, handleSubmit, clearErrors } = useForm<PhoneFormValues>({
    defaultValues: { phone: '' },
    reValidateMode: 'onSubmit',
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useAutoFocus(inputRef)

  const onSubmit = ({ phone }: PhoneFormValues) => submitPhone(phone)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.lead}>
        Введите номер телефона. Мы отправим SMS с кодом для входа.
      </p>

      <Controller
        name="phone"
        control={control}
        rules={PHONE_RULES}
        render={({ field, fieldState }) => (
          <PatternFormat
            {...field}
            className={s.field}
            getInputRef={(node: HTMLInputElement | null) =>
              (inputRef.current = node)
            }
            autoFocus
            format="+375 (##) ###-##-##"
            mask="_"
            placeholder="+375 (29) 000-00-00"
            onValueChange={() => clearErrors('phone')}
            customInput={TextField}
            variant="outlined"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
              htmlInput: {
                'aria-label': 'Номер телефона',
                inputMode: 'numeric',
                autoComplete: 'tel',
              },
            }}
          />
        )}
      />

      <div className={s.hint}>
        <p className={s.hintTitle}>Как это работает</p>
        <p className={s.hintText}>
          Код придёт в SMS и действует несколько минут. Никому его не сообщайте.
        </p>
      </div>

      <div className={s.footer}>
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
      </div>
    </form>
  )
}
