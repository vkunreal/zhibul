'use client'

import { FC } from 'react'

import { useModal } from '@/shared/providers'

import styles from './styles.module.scss'

export const CallBackButton: FC = () => {
  const { open } = useModal()

  return (
    <button
      type="button"
      className={styles.callBackButton}
      onClick={() => open('sendCallBack')}
    >
      Заказать звонок
    </button>
  )
}
