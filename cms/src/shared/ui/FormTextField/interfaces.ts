import { TextFieldProps } from '@mui/material'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T, unknown, T>
  name: FieldPath<T>
  textFieldProps?: TextFieldProps
  parseValue?: (value: string) => unknown
}
