import { NotFound } from '@/widgets/NotFound'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Страница не найдена',
}

export default function NotFoundPage() {
  return <NotFound />
}
