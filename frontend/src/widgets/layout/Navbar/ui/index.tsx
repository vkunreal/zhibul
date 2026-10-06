import cn from 'classnames'
import { FC } from 'react'

import { CategoriesButton, CategoriesTabs } from '@/entities/category'

import s from './styles.module.scss'

export const Navbar: FC = () => {
  return (
    <div className={s.wrapper}>
      <nav className={s.nav}>
        <div className={cn(s.navSpacer, s.navSpacerLeft)} />

        <section className={s.categories}>
          <CategoriesButton />
          <CategoriesTabs />
        </section>

        <div className={cn(s.navSpacer, s.navSpacerRight)} />
      </nav>
    </div>
  )
}
