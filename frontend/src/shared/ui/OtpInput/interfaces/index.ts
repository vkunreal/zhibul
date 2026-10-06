import { Control } from 'react-hook-form'

export interface OtpInputProps {
  length: number
  control: Control<{ code: string }>
  onSubmit: () => void
}
