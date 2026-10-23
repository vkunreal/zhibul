import { Control } from 'react-hook-form'

import { NewsFormValues } from '@entities/news/store/interfaces'

export interface NewsFormProps {
  control: Control<NewsFormValues, unknown, NewsFormValues>
  onSubmit: () => void
  saving: boolean
}
