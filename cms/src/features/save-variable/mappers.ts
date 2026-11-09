import { Variable } from '@entities/variables/model'

import { emptyVariableForm } from './constants'
import { VariableFormValues } from './interfaces'

export const toVariableForm = (
  variable: Variable | null,
): VariableFormValues => ({
  name: variable?.name || emptyVariableForm.name,
  value: variable?.value || emptyVariableForm.value,
})
