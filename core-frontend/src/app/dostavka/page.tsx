import { StaticPage } from '@/shared/ui'

import { getPage } from '@/shared/api'
import { Breadcrumbs } from '@/shared/ui'
import { Feedback, MAPS_TYPES, YandexMap } from '@/widgets'

import styles from './styles.module.scss'

const PAGE = 'dostavka'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page.seo_title ?? 'Доставка',
    description: page.seo_description ?? '',
    keywords: page.seo_keywords ?? '',
  }
}

export default async function Delivery() {
  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Доставка"
      />
      <StaticPage className={styles.wrapper} page={PAGE} />
      <YandexMap type={MAPS_TYPES.DELIVERY} />
      <Feedback />
    </>
  )
}
