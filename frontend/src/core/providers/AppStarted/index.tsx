'use client'

import { useGate } from 'effector-react'

import { AppGate } from '@/core/model'

export const AppStarted = () => {
  useGate(AppGate)

  return null
}
