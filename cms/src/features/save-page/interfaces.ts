import { Page } from '@entities/pages/model'

export interface AddPageMenuProps {
  isOpen: boolean
  title: string
  page?: Page | null
  onClose: () => void
  change?: boolean
}
