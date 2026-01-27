import cn from 'classnames'
import { FC } from 'react'

import { CatalogButton, CatalogTabs } from '@/features/catalog'

import styles from './styles.module.scss'

export const Navbar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={cn(styles.navSpacer, styles.navSpacerLeft)} />

        <section className={styles.categories}>
          <CatalogButton />
          <CatalogTabs />
        </section>

        <div className={cn(styles.navSpacer, styles.navSpacerRight)} />
      </nav>
    </div>
  )
}
