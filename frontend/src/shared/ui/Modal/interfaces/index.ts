import { DialogProps } from '@mui/material'

export interface ModalProps {
  open: boolean
  onClose: () => void

  title?: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode

  showCloseButton?: boolean

  /** запрет закрытия по backdrop и Esc */
  disableBackdropClose?: boolean
  disableEscClose?: boolean

  /** прокидываем самые нужные настройки размеров */
  maxWidth?: DialogProps['maxWidth'] // "xs" | "sm" | "md" | "lg" | "xl" | false
  fullWidth?: boolean

  /** если нужно убрать стандартные padding у контента */
  disableContentPadding?: boolean

  /** доп. пропсы на Dialog */
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>
}
