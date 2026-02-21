import { apiPost, DefaultResponse } from '@/shared/api'

import { SendFeedbackDTO } from '../model'

const ENDPOINTS = {
  sendFeedback: '/api/user',
}

export const feedbackApi = {
  async sendFeedback(dto: SendFeedbackDTO) {
    const response = await apiPost<DefaultResponse, SendFeedbackDTO>(
      ENDPOINTS.sendFeedback,
      dto,
    )

    return response
  },
}
