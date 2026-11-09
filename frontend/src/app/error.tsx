'use client'

import { ErrorFallback } from '@/shared/ui'

import s from './error.module.scss'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className={s.page}>
      <ErrorFallback onRetry={reset} />
    </div>
  )
}
