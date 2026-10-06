import { FC } from 'react'

import { getPage } from '@/shared/api'
import { Typography, Wrapper } from '@/shared/ui'

import { StaticPageProps } from '../interfaces'
import s from './styles.module.scss'

export const StaticPage: FC<StaticPageProps> = async ({
  page,
  children,
  ...rest
}) => {
  const pageData = await getPage(page)

  return (
    <Wrapper {...rest}>
      <div className={s.content}>
        <div>
          <Typography
            tag="h1"
            size="xxlRelative"
            textCenter
            className={s.title}
          >
            {pageData?.name}
          </Typography>

          <Typography size="md">
            <span dangerouslySetInnerHTML={{ __html: pageData?.text ?? '' }} />
          </Typography>

          {children}
        </div>
      </div>
    </Wrapper>
  )
}
