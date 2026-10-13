'use client'

import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

import { Modal } from '@/shared/ui'

import { CodeStep } from './CodeStep'
import { ErrorStep } from './ErrorStep'
import { AuthModalProps } from './interfaces'
import { PhoneStep } from './PhoneStep'
import { SuccessStep } from './SuccessStep'

import {
  $authScreen,
  $authTitle,
  $closeRequested,
  authFlowReset,
  AuthScreen,
} from '../../model'

export const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
  const { authScreen, title, closeRequested } = useUnit({
    authScreen: $authScreen,
    title: $authTitle,
    closeRequested: $closeRequested,
  })

  const reset = useUnit(authFlowReset)

  useEffect(() => {
    if (closeRequested) onClose()
  }, [closeRequested, onClose])

  useEffect(() => {
    return () => reset()
  }, [reset])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title ?? undefined}
      titleAlign="center"
      titleFontSize={24}
      showCloseButton={authScreen === AuthScreen.error}
      maxWidth="xs"
      sheet
    >
      {authScreen === AuthScreen.error ? (
        <ErrorStep />
      ) : authScreen === AuthScreen.success ? (
        <SuccessStep />
      ) : authScreen === AuthScreen.phone ? (
        <PhoneStep />
      ) : (
        <CodeStep />
      )}
    </Modal>
  )
}
