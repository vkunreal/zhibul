'use client'

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { SendCallBackModal } from '@/features/sendFeedback'

// список модалок - список пропсов
type ModalMap = {
  sendCallBack: null
}

type ModalName = keyof ModalMap

type MountedState =
  | { name: null; props: null }
  | { name: ModalName; props: ModalMap[ModalName] }

type Ctx = {
  open: <N extends ModalName>(name: N, props?: ModalMap[N]) => void
  close: () => void
  isOpen: boolean
}

const registry = {
  sendCallBack: SendCallBackModal,
} satisfies Record<ModalName, React.ComponentType<any>>

const ModalContext = createContext<Ctx | null>(null)

// Должно совпадать с длительностью fade-out в твоей модалке
const EXIT_MS = 300

export function ModalProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState<MountedState>({
    name: null,
    props: null,
  })
  const [isOpen, setIsOpen] = useState(false)

  const unmountTimerRef = useRef<number | null>(null)

  const open = useCallback(
    <N extends ModalName>(name: N, props: ModalMap[N] = null) => {
      if (unmountTimerRef.current) {
        window.clearTimeout(unmountTimerRef.current)
        unmountTimerRef.current = null
      }
      setMounted({ name, props } as MountedState)
      setIsOpen(true)
    },
    [],
  )

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) return
    if (!mounted.name) return

    unmountTimerRef.current = window.setTimeout(() => {
      setMounted({ name: null, props: null })
      unmountTimerRef.current = null
    }, EXIT_MS)

    return () => {
      if (unmountTimerRef.current) {
        window.clearTimeout(unmountTimerRef.current)
        unmountTimerRef.current = null
      }
    }
  }, [isOpen, mounted.name])

  const API = useMemo<Ctx>(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  )

  const Active = mounted.name ? registry[mounted.name] : null

  return (
    <ModalContext.Provider value={API}>
      {children}

      {Active &&
        createPortal(
          <Active {...(mounted.props as any)} open={isOpen} onClose={close} />,
          document.body,
        )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within <ModalProvider>')
  return ctx
}
