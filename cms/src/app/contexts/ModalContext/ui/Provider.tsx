import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'

import { DEFAULT_MODAL_STATE, EXIT_MS } from '../constants'
import { ModalContext } from '../context'
import { ModalName, ModalPayload, MountedModalState } from '../interfaces'
import { useTimeout } from '../utils/timeout'

import { ActiveModal } from './ActiveModal'

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState<MountedModalState>(DEFAULT_MODAL_STATE)
  const [isOpen, setIsOpen] = useState(false)
  const { start, clear } = useTimeout()

  const open = useCallback(
    <N extends ModalName>(name: N, props: ModalPayload<N>) => {
      clear()
      setMounted({ name, props } as MountedModalState)
      setIsOpen(true)
    },
    [clear],
  )

  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEffect(() => {
    if (isOpen || !mounted.name) return

    start(() => setMounted(DEFAULT_MODAL_STATE), EXIT_MS)

    return clear
  }, [isOpen, mounted.name, clear, start])

  const Api = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close],
  )

  return (
    <ModalContext.Provider value={Api}>
      {children}

      <ActiveModal mounted={mounted} isOpen={isOpen} onClose={close} />
    </ModalContext.Provider>
  )
}
