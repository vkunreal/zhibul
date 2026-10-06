'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'

import { Icon } from '@/shared/ui'

import { TABS } from '../utils'
import s from './styles.module.scss'

export const CategoriesTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <ul className={s.tabs}>
      {TABS.map(({ title, url, tabs }, key) => (
        <li
          key={key}
          className={s.parentTab}
          onMouseOver={() => setActiveTab(url)}
          onMouseLeave={() => setActiveTab(null)}
        >
          {url ? (
            <Link
              className={classNames({
                [s.activeLink]: isActive(url),
              })}
              href={url}
            >
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}

          {tabs && activeTab === url && (
            <div className={s.childTabList}>
              {tabs.map(({ title, url }) => (
                <Link className={s.childTab} href={url} key={url}>
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
