'use client'

import { useEffect, useState } from 'react'

import { SECOND_MS } from './constants'
import { secondsUntil } from './utils'

// Срок пересчитывается сразу при смене expiresAt и дальше раз в секунду.
// Обновление во время рендера нужно, чтобы экран не показал старые секунды до эффекта.
export const useSecondsUntil = (expiresAt: number) => {
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(expiresAt))
  const [trackedExpiresAt, setTrackedExpiresAt] = useState(expiresAt)

  if (expiresAt !== trackedExpiresAt) {
    setTrackedExpiresAt(expiresAt)
    setSecondsLeft(secondsUntil(expiresAt))
  }

  useEffect(() => {
    const timer = window.setInterval(
      () => setSecondsLeft(secondsUntil(expiresAt)),
      SECOND_MS,
    )

    return () => window.clearInterval(timer)
  }, [expiresAt])

  return secondsLeft
}
