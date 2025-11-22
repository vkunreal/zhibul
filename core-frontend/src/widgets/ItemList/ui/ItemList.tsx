import { FC } from 'react'
import cn from 'classnames'
import { Item } from '@/shared/api'
import { Wrapper } from '@/shared/ui'
import { Product } from '@/entities/product/ui/Product'

import { ViewToggle } from './viewToggle/ViewToggle'

import styles from './styles.module.scss'

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
