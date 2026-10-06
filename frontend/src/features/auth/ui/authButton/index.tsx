'use client'

import { CircularProgress } from '@mui/material'
import { useUnit } from 'effector-react'
import { FC } from 'react'

import { useModal, ModalEnum } from '@/core/providers'

import { $isAuthenticated, $isAuthLoading } from '@/entities/auth/model'

import { ButtonLink } from '@/shared/ui'

import s from './styles.module.scss'

export const AuthButton: FC = () => {
  const { open } = useModal()
  const [isAuthenticated, isAuthLoading] = useUnit([
    $isAuthenticated,
    $isAuthLoading,
  ])

  if (isAuthLoading) {
    return (
      <button
        type="button"
        className={s.authButton}
        disabled
        aria-busy="true"
        aria-label="Проверяем вход"
      >
        <CircularProgress size={18} color="inherit" />
      </button>
    )
  }

  if (isAuthenticated) {
    return (
      <ButtonLink href="/cabinet" className={s.authButton}>
        Кабинет
      </ButtonLink>
    )
  }

  return (
    <button
      type="button"
      className={s.authButton}
      onClick={() => open(ModalEnum.authModal)}
    >
      Войти
    </button>
  )
}
