import { getPage } from '@/shared/api'
import { FC } from 'react'
import { Wrapper } from '@/shared/ui'

import { StaticPageProps } from '../interfaces'
import styles from './styles.module.scss'

export const StaticPage: FC<StaticPageProps> = async ({
  page,
  children,
  ...rest
}) => {
  const pageData = await getPage(page)

  return (
    <Wrapper {...rest}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{pageData.name}</h1>

          <div dangerouslySetInnerHTML={{ __html: pageData.text }} />

          {children}
        </div>
      </div>
    </Wrapper>
  )
}
