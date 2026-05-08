'use client'

import { FC } from 'react'

import { useModal } from '@/core/providers'

import styles from './styles.module.scss'

export const FeedbackButton: FC = () => {
  const { open } = useModal()

  return (
    <button
      type="button"
      className={styles.feedbackButton}
      onClick={() => open('feedbackModal')}
    >
      Заказать звонок
    </button>
  )
}
