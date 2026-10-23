import { useCallback, useRef } from 'react'

// Один таймер. start отменяет предыдущий и запускает новый, clear только отменяет.
export const useTimeout = () => {
  const timer = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timer.current === null) return

    window.clearTimeout(timer.current)
    timer.current = null
  }, [])

  const start = useCallback(
    (callback: () => void, delay: number) => {
      clear()
      timer.current = window.setTimeout(() => {
        timer.current = null
        callback()
      }, delay)
    },
    [clear],
  )

  return { start, clear }
}
