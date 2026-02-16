'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * При клиентской навигации (Link) сбрасывает скролл в начало страницы.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
