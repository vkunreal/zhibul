import cn from 'classnames'
import Image from 'next/image'
import { FC, memo, useMemo } from 'react'

import { Button, ButtonLink } from '@/shared/ui'

import { Item } from '../../model'

import { ProductOption } from './option/Option'
import styles from './styles.module.scss'

interface ProductProps {
  product: Item
  isWide: boolean
}

export const Product: FC<ProductProps> = memo(({ product, isWide = false }) => {
  const productImage = useMemo(
    () => product.images.find((im) => im.is_main) || product.images[0],
    [product],
  )

  return (
    <article
      className={cn(styles.product, {
        [styles.wide]: isWide,
      })}
    >
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={productImage.src}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className={styles.productBody}>
        <div className={styles.productInfo}>
          <h2 dangerouslySetInnerHTML={{ __html: product.name }} />

          {product.brand && (
            <ProductOption name="Бренд" value={product.brand} />
          )}

          {product.manufacturer && (
            <ProductOption
              name="Страна производитель"
              value={product.manufacturer}
            />
          )}

          {!!product.menuOptions.length &&
            product.menuOptions.map(({ id, name, value, is_dropdown }) => (
              <ProductOption
                key={id}
                name={name}
                value={value}
                isDropdown={!!is_dropdown}
              />
            ))}
        </div>

        <div className={styles.productButtons}>
          <ButtonLink
            href={`${product.category_url}/${product.url}`}
            className={styles.productButton}
            size="small"
            uppercase
          >
            Подробнее
          </ButtonLink>

          <Button
            className={styles.productButton}
            size="small"
            variant="white"
            uppercase
          >
            {product.display_price}
          </Button>
        </div>
      </div>
    </article>
  )
})

Product.displayName = 'Product'
