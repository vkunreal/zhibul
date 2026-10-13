import { FC } from 'react'

import { Icon } from '@/shared/ui'

import s from './styles.module.scss'

export const ErrorStep: FC = () => {
  return (
    <div className={s.screen} role="alert">
      <Icon name="error" className={s.icon} width={64} height={64} aria-hidden />
      <p className={s.title}>Что-то пошло не так</p>
      <p className={s.text}>
        Мы уже работаем над этим. Попробуйте чуть позже.
      </p>
    </div>
  )
}
