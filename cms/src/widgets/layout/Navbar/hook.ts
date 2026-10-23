import { useState } from 'react'

const STORAGE_KEY = 'navbar-collapsed'

export const useNavbarCollapsed = () => {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === '1',
  )

  const toggle = () => {
    setCollapsed((value) => {
      const next = !value
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      return next
    })
  }

  return { collapsed, toggle }
}
