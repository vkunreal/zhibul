import { ButtonLink, StaticPage } from '@/shared/ui'

import { getPage } from '@/shared/api'
import { Breadcrumbs } from '@/shared/ui'
import { Feedback, MAPS_TYPES, YandexMap } from '@/widgets'

import styles from './styles.module.scss'
import Image from 'next/image'
import { BLOCKS } from './constants'

const PAGE = 'uslugi'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Доставка',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function Delivery() {
  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Услуги"
      />
      <StaticPage className={styles.wrapper} page={PAGE}>
        <ul>
          {BLOCKS.map(({ id, title, description, image, link, phone }) => (
            <li key={id}>
              <Image src={image} alt="uslugi-image" width={400} height={400} />

              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>

              <div>
                <ButtonLink href={`/${link}`}>Подробнее</ButtonLink>
                <ButtonLink href={`tel:${phone}`}>Позвонить</ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </StaticPage>
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <Feedback />
    </>
  )
}
