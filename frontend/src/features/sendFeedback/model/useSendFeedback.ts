'use client'

import { useState } from 'react'

import { feedbackApi, SendFeedbackDTO } from '@/entities/feedback'

export const useSendFeedback = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const send = async (dto: SendFeedbackDTO) => {
    setLoading(true)
    setError(false)
    const response = await feedbackApi.sendFeedback(dto)

    if (!response.status) {
      setError(true)
    }
    setLoading(false)
  }

  return { loading, error, send }
}
