import cn from 'classnames'
import { FC } from 'react'

import { ProductItem, Product } from '@/entities/product'
import { ViewToggleBlock } from '@/features/toggleView'
import { Wrapper } from '@/shared/ui'

import styles from './styles.module.scss'

export const ProductList: FC<{
  products: Product[]
  currentView: 'grid' | 'list'
}> = ({ products, currentView }) => {
  const filteredItems =
    products?.sort((a, b) => (a.position < b.position ? -1 : 1)) ?? []

  return (
    <Wrapper>
      <ViewToggleBlock />

      <section
        className={cn(styles.itemList, {
          [styles.list]: currentView === 'list',
        })}
      >
        {!!filteredItems.length &&
          filteredItems.map((product) => (
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
