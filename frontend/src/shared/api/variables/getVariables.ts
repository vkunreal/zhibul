import type { Variable } from '@/shared/model'

import { apiGet } from '../base'

const ENDPOINTS = {
  variables: '/api/variables',
}

export const variablesApi = {
  async getVariables() {
    const variables = await apiGet<Variable[]>(ENDPOINTS.variables, 3600)

    return variables
  },
}
