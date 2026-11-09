import Link from 'next/link'

import { categoriesApi } from '@/entities/category'

import { getPage } from '@/shared/api'

import { TABS } from './constants'
import s from './styles.module.scss'

const PAGE = 'katalog'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Каталог',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function Katalog() {
  const categories = await categoriesApi.getCategories()

  if (!categories?.length) {
    return (
      <section>
        <h2>Категорий нет</h2>
      </section>
    )
  }

  const categoriesList = (parentId: number | null = null) => {
    return (
      categories
        .filter((c) => c.parent_id === parentId && !!c.active)
        .sort((a, b) => (a.position < b.position ? -1 : 1)) || {}
    )
  }

  return (
    <>
      <div className={s.list}>
        {categoriesList().map(({ id: parent_id, name, url }) => (
          <article key={parent_id}>
            <Link href={`/menu/${url}`}>
              <span className={s.elemTitle}>{name}</span>
            </Link>

            <ul className={s.details}>
              {categoriesList(parent_id).map(({ id, name, url }) => (
                <Link href={`/menu/${url}`} key={id}>
                  <span>{name}</span>
                </Link>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className={s.tabs}>
        <hr />

        {TABS.map((tab) => (
          <div key={tab.url} className={s.tab}>
            <Link href={tab.url} className={s.tabLink}>
              {tab.title}
            </Link>

            {tab.tabs?.length && (
              <div className={s.tabDetails}>
                {tab.tabs.map((tab) => (
                  <div key={tab.url} className={s.subTab}>
                    <Link href={tab.url} className={s.subTabLink}>
                      {tab.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  )
}
