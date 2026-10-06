'use client'

import { FC } from 'react'

import { ModalEnum, useModal } from '@/core/providers'

import s from './styles.module.scss'

export const FeedbackButton: FC = () => {
  const { open } = useModal()

  return (
    <button
      type="button"
      className={s.feedbackButton}
      onClick={() => open(ModalEnum.feedbackModal)}
    >
      Заказать звонок
    </button>
  )
}
