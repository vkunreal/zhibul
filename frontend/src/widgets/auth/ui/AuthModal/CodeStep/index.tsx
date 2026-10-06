import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { authEvent } from '@/entities/auth'

import { OtpInput } from '@/shared/ui'

import { formatTime } from './helpers'
import s from './styles.module.scss'

export const CodeStep: FC<{
  onClose: () => void
  ttl: number
  length: number
  phoneNumber: string
  onBack: () => void
}> = ({ onClose, ttl, length, phoneNumber, onBack }) => {
  const [secondsLeft, setSecondsLeft] = useState(ttl)
  const login = useUnit(authEvent)
  const { control, handleSubmit } = useForm<{ code: string }>({
    defaultValues: { code: '' },
  })

  const submit = handleSubmit((data) => {
    login({
      phoneNumber: phoneNumber.replace(/[^0-9]/g, ''),
      code: data.code.replace(/\s/g, ''),
    })
    onClose()
  })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <form className={s.form} onSubmit={submit}>
      <OtpInput length={length} control={control} onSubmit={submit} />

      <div className={s.actions}>
        <button type="submit" className={s.button}>
          Войти
        </button>

        <button type="button" className={s.back} onClick={onBack}>
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
