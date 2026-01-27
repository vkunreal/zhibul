import type { Variable } from '@/shared/interfaces'

import { apiGet } from '../base'

const ENDPOINTS = {
  variables: '/api/variables',
}

export const getVariables = async () => {
  const variables = await apiGet<Variable[]>(ENDPOINTS.variables, 3600)

  return variables
}
