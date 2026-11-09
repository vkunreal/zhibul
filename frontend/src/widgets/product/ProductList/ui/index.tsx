import cn from 'classnames'
import { FC } from 'react'

import { ViewToggleBlock } from '@/features/toggleView'

import { ProductItem, Product } from '@/entities/product'

import { Wrapper } from '@/shared/ui'

import s from './styles.module.scss'

export const ProductList: FC<{
  products: Product[]
  currentView: 'grid' | 'list'
}> = ({ products, currentView }) => {
  // Порядок как пришёл с бэкенда (sort_mode категории).
  const items = products ?? []

  console.log(items)

  return (
    <Wrapper>
      <ViewToggleBlock />

      <section
        className={cn(s.itemList, {
          [s.list]: currentView === 'list',
        })}
      >
        {!!items.length &&
          items.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isWide={currentView === 'list'}
            />
          ))}
      </section>
    </Wrapper>
  )
}
