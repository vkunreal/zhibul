import { Variable } from '@entities/variables/model'

export interface VariableFormValues {
  name: string
  value: string
}

export interface ChangeVariableMenuProps {
  title: string
  variable?: Variable | null
  isOpen: boolean
  onClose: () => void
}

export interface ChangeVariablePayload {
  values: VariableFormValues
  variable: Variable
}
