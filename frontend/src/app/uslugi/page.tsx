import { getPage } from '@/shared/api'
import { ButtonLink, FlexImage, StaticPage } from '@/shared/ui'
import { Breadcrumbs } from '@/shared/ui'
import { FeedbackBlock } from '@/widgets/feedback'
import { MAPS_TYPES, YandexMap } from '@/widgets/yandex'

import { BLOCKS } from './constants'
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
        activeTitle="Услуги"
      />
      <StaticPage className={styles.wrapper} page={PAGE}>
        <ul className={styles.list}>
          {BLOCKS.map(({ id, title, description, image, link, phone }) => (
            <li key={id} className={styles.listItem}>
              <FlexImage src={image} alt="uslugi-image" maxWidth={400} />

              <div className={styles.content}>
                <div>
                  <h2>{title}</h2>
                  <p className={styles.description}>{description}</p>
                </div>

                <div className={styles.buttons}>
                  <ButtonLink href={`/${link}`} size="small" uppercase>
                    Подробнее
                  </ButtonLink>

                  <ButtonLink
                    href={`tel:${phone}`}
                    variant="white"
                    size="small"
                    uppercase
                  >
                    Позвонить
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </StaticPage>
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <FeedbackBlock />
    </>
  )
}
