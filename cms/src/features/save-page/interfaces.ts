import { Page } from '@entities/pages/model'

export interface AddPageMenuProps {
  page: Page | null
  onSubmit: (page: Page) => void
  isOpen: boolean
  onClose: () => void
}
