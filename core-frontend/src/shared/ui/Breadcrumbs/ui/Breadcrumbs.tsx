import Link from 'next/link'
import { FC } from 'react'

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
            <Link href={url}>{title}</Link>
            <span>/</span>
          </li>
        ))}

        {!itemCode && (
          <li className={styles.element}>
            <span>{activeTitle}</span>
          </li>
        )}
      </ul>

      {itemCode && (
        <div className={styles.itemTitle}>
          <span>{activeTitle}</span>
          <span>{itemCode}</span>
        </div>
      )}
    </Wrapper>
  )
}
