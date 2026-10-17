export interface FileFormValues {
  title: string
  icon: string
}

export interface FileModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: number
}

export interface FileUploadPayload extends FileFormValues {
  itemId: number
  file: File
}
