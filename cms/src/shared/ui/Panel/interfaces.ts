import { ReactNode } from 'react'

export interface PanelProps {
  title: ReactNode
  actions?: ReactNode
  children?: ReactNode
  align?: 'center' | 'start'
  padded?: boolean
}
