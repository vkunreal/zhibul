import { DialogProps } from '@mui/material'

export interface ModalProps {
  open: boolean
  onClose: () => void

  title?: React.ReactNode
  titleAlign?: 'left' | 'center'
  titleFontSize?: number
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
  width?: number | string

  /** если нужно убрать стандартные padding у контента */
  disableContentPadding?: boolean

  /** доп. пропсы на Dialog */
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>
}
