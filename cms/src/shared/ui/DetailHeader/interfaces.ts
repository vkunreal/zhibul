import { ReactNode } from 'react'

export interface DetailHeaderProps {
  backLabel: string
  onBack: () => void
  title: string
  meta?: string
  chips?: ReactNode
  actions?: ReactNode
}
