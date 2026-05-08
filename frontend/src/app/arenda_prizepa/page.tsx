import { trailersApi } from '@/entities/trailer'
import { getPage, useVariables } from '@/shared/api'
import { Breadcrumbs, Wrapper } from '@/shared/ui'
import { TrailerList } from '@/widgets/trailer'

import styles from './styles.module.scss'

const PAGE = 'arenda_prizepa'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  const {
    seo_title: title = 'Аренда автоприцепов',
    seo_description: description = '',
    seo_keywords: keywords = '',
  } = page || {}

  return { title, description, keywords }
}

export default async function TrailersRent() {
  const trailers = await trailersApi.getAllTrailers()
  const { variable } = await useVariables()

  if (!trailers?.length) {
    return null
  }

  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Аренда автоприцепов"
      />
      <Wrapper className={styles.container}>
        <TrailerList list={trailers} phone={variable('phone_services')} />
      </Wrapper>
    </>
  )
}
