import { ReactNode } from 'react'

export interface ConfirmProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}
