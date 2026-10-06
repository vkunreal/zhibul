import Link from 'next/link'
import { FC } from 'react'

import { Category } from '@/shared/model'
import { Button, FlexImage } from '@/shared/ui'

import s from './styles.module.scss'

export const CategoryList: FC<{ categories: Category[] }> = ({
  categories,
}) => {
  return (
    <section className={s.categories}>
      {!!categories.length &&
        categories.map((category) => (
          <div key={category.id} className={s.category}>
            <Link href={`/menu/${category.url}`}>
              <FlexImage
                src={category.image}
                alt={category.name}
                maxWidth={400}
              />
            </Link>

            <div className={s.categoryHeading}>
              <Link
                className={s.categoryName}
                href={`/menu/${category.url}`}
              >
                <span>{category.name}</span>
              </Link>

              <p>{category.description}</p>
            </div>

            <div className={s.buttons}>
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
