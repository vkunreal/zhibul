import { ComponentType } from 'react'
import { createPortal } from 'react-dom'

import { MODAL_REGISTRY } from '../constants'
import { ModalMap, MountedModalState } from '../interfaces'

export const ActiveModal = ({
  mounted,
  isOpen,
  onClose,
}: {
  mounted: MountedModalState
  isOpen: boolean
  onClose: () => void
}) => {
  if (mounted.name === null) return null

  const Modal = MODAL_REGISTRY[mounted.name] as ComponentType<
    ModalMap[typeof mounted.name]
  >

  return createPortal(
    <Modal {...mounted.props} isOpen={isOpen} onClose={onClose} />,
    document.body,
  )
}
