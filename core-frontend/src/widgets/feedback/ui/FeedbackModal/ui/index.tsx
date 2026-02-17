'use client'

import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { FC } from 'react'

import { FeedbackForm } from '@/features/sendFeedback'
import { Modal } from '@/shared/ui'

import { FeedbackModalProps } from '../interfaces'

const SendButton = styled(Button)({
  backgroundColor: '#2c2c2c',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
})

export const FeedbackModal: FC<FeedbackModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Закажите обратный звонок"
      subtitle="Заполните форму и наш специалист перезвонит вам"
    >
      <FeedbackForm sendButton={SendButton} short />
    </Modal>
  )
}
