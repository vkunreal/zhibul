import { getCategories, getPage } from '@/shared/api'
import styles from './styles.module.scss'
import Link from 'next/link'
import { TABS } from './constants'

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
  const categories = await getCategories()

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
      <div className={styles.list}>
        {categoriesList().map(({ id: parent_id, name, url }) => (
          <article key={parent_id}>
            <Link href={`/menu/${url}`}>
              <span className={styles.elemTitle}>{name}</span>
            </Link>

            <ul className={styles.details}>
              {categoriesList(parent_id).map(({ id, name, url }) => (
                <Link href={`/menu/${url}`} key={id}>
                  <span>{name}</span>
                </Link>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className={styles.tabs}>
        <hr />

        {TABS.map((tab) => (
          <div key={tab.url} className={styles.tab}>
            <Link href={tab.url} className={styles.tabLink}>
              {tab.title}
            </Link>

            {tab.tabs?.length && (
              <div className={styles.tabDetails}>
                {tab.tabs.map((tab) => (
                  <div key={tab.url} className={styles.subTab}>
                    <Link href={tab.url} className={styles.subTabLink}>
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
