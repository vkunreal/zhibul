import { getVariables } from '../api'
import { getVariable } from '../utils'

export const useVariables = async () => {
  const variables = await getVariables()
  const variable = getVariable(variables ?? [])

  return { variable, variables }
}
