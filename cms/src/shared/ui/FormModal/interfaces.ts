import { ReactNode, SubmitEventHandler } from 'react'

export interface FormModalProps {
  isOpen: boolean
  title: ReactNode
  onClose: () => void
  onSubmit: SubmitEventHandler<HTMLFormElement>
  children: ReactNode
  submitText?: string
  cancelText?: string
  submitDisabled?: boolean
  contentClassName?: string
}
