import { useUnit } from 'effector-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { OtpInput } from '@/shared/ui'

import { CodeFormValues } from './interfaces'
import s from './styles.module.scss'
import { useSecondsUntil } from './useSecondsUntil'
import { formatTime } from './utils'

import { $codeSession, backToPhone, signInStarted } from '../../../model'

export const CodeStep: FC = () => {
  const { phone, issued, expiresAt } = useUnit($codeSession)
  const { startSignIn, returnToPhone } = useUnit({
    startSignIn: signInStarted,
    returnToPhone: backToPhone,
  })
  const { control, handleSubmit } = useForm<CodeFormValues>({
    defaultValues: { code: '' },
  })
  const secondsLeft = useSecondsUntil(expiresAt)

  const onSubmit = ({ code }: CodeFormValues) =>
    startSignIn(code.replace(/\s/g, ''))

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.lead}>Код отправлен на {phone}</p>

      <OtpInput
        length={issued.length}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
      />

      <div className={s.actions}>
        <button type="submit" className={s.button}>
          Войти
        </button>

        <button type="button" className={s.back} onClick={returnToPhone}>
          Изменить номер
        </button>
      </div>

      <div className={s.footer}>
        <p className={s.note}>
          {secondsLeft > 0
            ? `Код действует ${formatTime(secondsLeft)}`
            : 'Срок действия кода истёк'}
        </p>
      </div>
    </form>
  )
}
