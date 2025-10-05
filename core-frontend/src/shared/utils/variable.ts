import { Variable } from '../interfaces'

export const getVariable = (variables: Variable[]) => {
  return (name: string) => variables.find(v => v.name === name)?.value ?? ''
}
