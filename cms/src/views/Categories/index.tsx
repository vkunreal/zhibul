import Stack from '@mui/material/Stack'

import { PageHeader } from '@shared/ui'
import { CategoryList } from '@widgets/categories/CategoryList'

import s from './styles.module.scss'

export const Categories: React.FC = () => {
  return (
    <Stack spacing={2} className={s.page}>
      <PageHeader
        title='Категории'
        subtitle='Структура каталога и видимость разделов'
      />

      <CategoryList />
    </Stack>
  )
}
