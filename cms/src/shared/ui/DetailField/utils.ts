import { ReactNode } from 'react'

export const isEmpty = (value: ReactNode) =>
  value == null || value === '' || (typeof value === 'string' && !value.trim())
