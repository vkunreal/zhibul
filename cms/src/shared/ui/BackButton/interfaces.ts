import { ReactNode } from 'react'

export interface BackButtonProps {
  children: ReactNode
  onClick: () => void
  placement?: 'edge' | 'block'
}
