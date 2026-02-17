'use client'

import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { FC } from 'react'

import { FeedbackForm } from '@/features/sendFeedback'
import { Wrapper } from '@/shared/ui'

import styles from './styles.module.scss'

const WhiteButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: 'rgba(0, 0, 0, 0.87)',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
})

export const FeedbackBlock: FC = () => {
  return (
    <Wrapper className={styles.wrapper} maxWidth="900px">
      <div className={styles.feedback}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Есть вопросы или необходима консультация?
          </h2>
          <p className={styles.description}>
            Заполните форму и наш специалист ответит на все возникшие вопросы!
          </p>
        </div>

        <FeedbackForm sendButton={WhiteButton} />
      </div>
    </Wrapper>
  )
}
