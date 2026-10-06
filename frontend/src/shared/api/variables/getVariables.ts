import type { Variable } from '@/shared/model'

import { httpClient } from '../httpClient'

const ENDPOINTS = {
  variables: '/api/variables',
}

export const variablesApi = {
  async getVariables() {
    const { data } = await httpClient.get<Variable[]>({
      url: ENDPOINTS.variables,
    })

    return data
  },
}
