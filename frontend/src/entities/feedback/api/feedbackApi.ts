import { DefaultResponse, httpClient } from '@/shared/api'

import { SendFeedbackDTO } from '../model'

const ENDPOINTS = {
  sendFeedback: '/api/user',
}

export const feedbackApi = {
  async sendFeedback(dto: SendFeedbackDTO) {
    const { data } = await httpClient.post<DefaultResponse, SendFeedbackDTO>({
      url: ENDPOINTS.sendFeedback,
      data: dto,
    })

    return data
  },
}
