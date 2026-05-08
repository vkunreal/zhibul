import { ComponentType, ReactNode } from 'react'

interface SendButtonProps {
  type: 'submit'
  variant: 'contained'
  style?: React.CSSProperties
  fullWidth?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  loading: boolean
}

export interface FeedbackFormProps {
  sendButton: ComponentType<SendButtonProps>
  short?: boolean
}
