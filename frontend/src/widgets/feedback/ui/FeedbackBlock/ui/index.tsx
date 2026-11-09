'use client'

import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { FC } from 'react'

import { FeedbackForm } from '@/features/sendFeedback'

import { Wrapper } from '@/shared/ui'

import s from './styles.module.scss'

const WhiteButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: 'rgba(0, 0, 0, 0.87)',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
})

export const FeedbackBlock: FC = () => {
  return (
    <Wrapper className={s.wrapper} maxWidth="900px">
      <div className={s.feedback}>
        <div className={s.header}>
          <h2 className={s.title}>
            Есть вопросы или необходима консультация?
          </h2>
          <p className={s.description}>
            Заполните форму и наш специалист ответит на все возникшие вопросы!
          </p>
        </div>

        <FeedbackForm sendButton={WhiteButton} />
      </div>
    </Wrapper>
  )
}
