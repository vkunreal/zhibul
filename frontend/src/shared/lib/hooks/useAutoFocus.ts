'use client'

import { RefObject, useEffect } from 'react'

import { AUTO_FOCUS_DELAY_MS } from './constants'

export const useAutoFocus = <T extends HTMLElement>(
  ref: RefObject<T | null>,
) => {
  useEffect(() => {
    const timer = window.setTimeout(
      () => ref.current?.focus(),
      AUTO_FOCUS_DELAY_MS,
    )

    return () => window.clearTimeout(timer)
  }, [ref])
}
