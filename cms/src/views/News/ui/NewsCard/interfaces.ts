import { News } from '@entities/news/model'

export interface NewsCardProps {
  news: News
  onEdit: () => void
  onDelete: () => void
}
