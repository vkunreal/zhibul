import { variablesApi } from './getVariables'
import { getVariable } from './selectors'

export const useVariables = async () => {
  const variables = await variablesApi.getVariables()
  const variable = getVariable(variables ?? [])

  return { variable, variables }
}
