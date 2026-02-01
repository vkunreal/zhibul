import { getPage } from '@/shared/api'
import { StaticPage, Breadcrumbs } from '@/shared/ui'
import { Feedback } from '@/widgets/layout'
import { MAPS_TYPES, YandexMap } from '@/widgets/yandex'

import styles from './styles.module.scss'

const PAGE = 'uslugi'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Услуги',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function Uslugi() {
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
