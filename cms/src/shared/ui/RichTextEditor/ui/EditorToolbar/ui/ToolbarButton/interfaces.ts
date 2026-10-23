import { ReactNode } from 'react'

export interface ToolbarButtonProps {
  title: string
  disabled?: boolean
  active?: boolean
  onClick: () => void
  icon: ReactNode
}
