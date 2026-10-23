import { Page } from '@entities/pages/model'

export interface PageCardProps {
  page: Page
  onEdit: () => void
  onDelete: () => void
}
