'use client'

import { FC, useMemo, useState } from 'react'

import { Modal } from '@/shared/ui'

import { CodeStep } from './CodeStep'
import { AuthModalProps, IssuedCode, Step } from './interfaces'
import { PhoneStep } from './PhoneStep'

export const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<Step>(Step.phone)
  const [code, setCode] = useState<IssuedCode | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const title = useMemo(() => {
    return step === Step.phone ? 'Войдите в аккаунт' : 'Введите код'
  }, [step])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      titleAlign="center"
      titleFontSize={24}
      showCloseButton={false}
      maxWidth="xs"
    >
      {step === Step.phone ? (
        <PhoneStep
          onCodeIssued={(phone, issued) => {
            setCode(issued)
            setPhoneNumber(phone)
            setStep(Step.code)
          }}
        />
      ) : (
        code && (
          <CodeStep
            onClose={onClose}
            ttl={code.ttl}
            length={code.length}
            phoneNumber={phoneNumber}
            onBack={() => {
              setStep(Step.phone)
              setCode(null)
              setPhoneNumber('')
            }}
          />
        )
      )}
    </Modal>
  )
}
