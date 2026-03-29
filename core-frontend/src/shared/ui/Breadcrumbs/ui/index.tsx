import Link from 'next/link'
import { FC } from 'react'

import { notoSans } from '@/shared/assets'
import { Wrapper } from '@/shared/ui'

import styles from './styles.module.scss'

export interface BreadCrumb {
  url: string
  title: string
}

export interface BreadcrumbsProps {
  elements: BreadCrumb[]
  activeTitle: string
  itemCode?: string
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  elements,
  activeTitle,
  itemCode,
}) => {
  return (
    <Wrapper className={styles.wrapper}>
      <ul className={styles.list}>
        {elements.map(({ url, title }) => (
          <li className={styles.element} key={url}>
            <Link href={url} className={notoSans.className}>
              {title}
            </Link>
            <span className={notoSans.className}>/</span>
          </li>
        ))}

        {!itemCode && (
          <li className={styles.element}>
            <span className={notoSans.className}>{activeTitle}</span>
          </li>
        )}
      </ul>

      {itemCode && (
        <div className={styles.itemTitle}>
          <span className={notoSans.className}>{activeTitle}</span>
          <span className={notoSans.className}>{itemCode}</span>
        </div>
      )}
    </Wrapper>
  )
}
