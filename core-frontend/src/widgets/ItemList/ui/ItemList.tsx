import cn from 'classnames'
import { FC } from 'react'

import { Item, Product } from '@/entities/product'
import { Wrapper } from '@/shared/ui'

import styles from './styles.module.scss'
import { ViewToggle } from './viewToggle/ViewToggle'

export const ItemList: FC<{ items: Item[]; currentView: 'grid' | 'list' }> = ({
  items,
  currentView,
}) => {
  return (
    <Wrapper>
      <ViewToggle />

      <section
        className={cn(styles.itemList, {
          [styles.list]: currentView === 'list',
        })}
      >
        {!!items.length &&
          items.map((product) => (
            <Product
              key={product.id}
              product={product}
              isWide={currentView === 'list'}
            />
          ))}
      </section>
    </Wrapper>
  )
}
