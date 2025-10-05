'use client'

import { useEffect, useState } from 'react'

export const useResize = () => {
  const [innerWidth, setWidth] = useState(0)

  const onResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { innerWidth }
}
