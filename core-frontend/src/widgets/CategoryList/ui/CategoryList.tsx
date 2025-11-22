import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Category } from '@/shared/api'
import { Button } from '@/shared/ui'

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
              <Image
                className={styles.categoryImage}
                src={category.image}
                alt={category.name}
                width="200"
                height={200}
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
