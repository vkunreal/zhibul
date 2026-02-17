import Link from 'next/link'
import { FC } from 'react'

import { Category } from '@/shared/model'
import { Button, FlexImage } from '@/shared/ui'

import styles from './styles.module.scss'

export const CategoryList: FC<{ categories: Category[] }> = ({
  categories,
}) => {
  return (
    <section className={styles.categories}>
      {!!categories.length &&
        categories.map((category) => (
          <div key={category.id} className={styles.category}>
            <Link href={`/menu/${category.url}`}>
              <FlexImage
                src={category.image}
                alt={category.name}
                maxWidth={400}
              />
            </Link>

            <div className={styles.categoryHeading}>
              <Link
                className={styles.categoryName}
                href={`/menu/${category.url}`}
              >
                <span>{category.name}</span>
              </Link>

              <p>{category.description}</p>
            </div>

            <div className={styles.buttons}>
              <Link href={`/menu/${category.url}`}>
                <Button>Каталог</Button>
              </Link>

              <Button variant="white">Запрос</Button>
            </div>
          </div>
        ))}
    </section>
  )
}
