import { Metadata } from 'next'

import { NotFound } from '@/widgets/NotFound'

export const metadata: Metadata = {
  title: 'Страница не найдена',
}

export default function NotFoundPage() {
  return <NotFound />
}
