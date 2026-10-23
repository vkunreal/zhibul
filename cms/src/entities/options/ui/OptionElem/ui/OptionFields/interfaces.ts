import { Control, UseFormRegister } from 'react-hook-form'

export interface OptionFormValues {
  name: string
  value: string
  isSelectMenu: boolean
  isShowMenu: boolean
}

export interface OptionFieldsProps {
  register: UseFormRegister<OptionFormValues>
  control: Control<OptionFormValues, unknown, OptionFormValues>
}
