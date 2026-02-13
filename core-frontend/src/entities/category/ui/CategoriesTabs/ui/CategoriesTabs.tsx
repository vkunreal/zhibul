'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'

import { Icon } from '@/shared/ui'

import { TABS } from '../utils'

import styles from './styles.module.scss'

export const CategoriesTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <ul className={styles.tabs}>
      {TABS.map(({ title, url, tabs }, key) => (
        <li
          key={key}
          className={styles.parentTab}
          onMouseOver={() => setActiveTab(url)}
          onMouseLeave={() => setActiveTab(null)}
        >
          {url ? (
            <Link
              className={classNames({
                [styles.activeLink]: isActive(url),
              })}
              href={url}
            >
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}

          {tabs && activeTab === url && (
            <div className={styles.childTabList}>
              {tabs.map(({ title, url }) => (
                <Link className={styles.childTab} href={url} key={url}>
                  {title}

                  <Icon name="slider-arrow" width={12} height={12} />
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
