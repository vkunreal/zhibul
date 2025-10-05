import { FC } from 'react'
import { Wrapper } from '@/shared/ui/Wrapper'

import styles from './styles.module.scss'
import Link from 'next/link'

export interface BreadCrumb {
  url: string
  title: string
}

export interface BreadcrumbsProps {
  elements: BreadCrumb[]
  activeTitle: string
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  elements,
  activeTitle,
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

        <li className={styles.element}>
          <span>{activeTitle}</span>
        </li>
      </ul>
    </Wrapper>
  )
}
