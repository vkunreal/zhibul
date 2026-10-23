import { Variable } from '@entities/variables/model'

export interface VariableFormValues {
  name: string
  value: string
}

export interface ChangeVariableMenuProps {
  variable: Variable | null
  onSubmit: (values: VariableFormValues) => void
  isOpen: boolean
  onClose: () => void
}

export interface ChangeVariablePayload {
  values: VariableFormValues
  variable: Variable
}
