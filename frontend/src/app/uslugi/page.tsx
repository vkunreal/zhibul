import { FeedbackBlock } from '@/widgets/feedback'
import { MAPS_TYPES, YandexMap } from '@/widgets/yandex'

import { getPage } from '@/shared/api'
import { ButtonLink, FlexImage, StaticPage } from '@/shared/ui'
import { Breadcrumbs } from '@/shared/ui'

import { BLOCKS } from './constants'
import s from './styles.module.scss'

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
      <StaticPage className={s.wrapper} page={PAGE}>
        <ul className={s.list}>
          {BLOCKS.map(({ id, title, description, image, link, phone }) => (
            <li key={id} className={s.listItem}>
              <FlexImage src={image} alt="uslugi-image" maxWidth={400} />

              <div className={s.content}>
                <div>
                  <h2>{title}</h2>
                  <p className={s.description}>{description}</p>
                </div>

                <div className={s.buttons}>
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
