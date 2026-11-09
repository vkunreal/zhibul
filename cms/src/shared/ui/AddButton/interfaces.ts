import { ReactNode } from 'react'

export interface AddButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}
