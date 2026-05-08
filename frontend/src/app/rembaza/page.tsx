import { getPage } from '@/shared/api'
import { Breadcrumbs, Divider, Typography, Wrapper } from '@/shared/ui'
import { RembazaCard, RembazaOptions } from '@/widgets/rembaza'

import styles from './styles.module.scss'

const PAGE = 'rembaza'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  const {
    seo_title: title = 'Ремонт пневмоинструмента',
    seo_description: description = '',
    seo_keywords: keywords = '',
  } = page || {}

  return { title, description, keywords }
}

export default async function Rembaza() {
  const pageData = await getPage(PAGE)

  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Ремонт пневмоинструмента"
      />
      <Wrapper className={styles.container}>
        <Typography
          tag="h1"
          size="xxlRelative"
          textCenter
          className={styles.title}
        >
          {pageData?.name}
        </Typography>

        <Divider center />

        <RembazaCard text={pageData?.text} />

        <RembazaOptions />
      </Wrapper>
    </>
  )
}
