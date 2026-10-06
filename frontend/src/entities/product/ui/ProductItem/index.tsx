import cn from 'classnames'
import { FC, memo, useMemo } from 'react'

import { Button, ButtonLink, FlexImage, Typography } from '@/shared/ui'


import { ProductOption } from './Option'
import s from './styles.module.scss'

import { Product } from '../../model'

interface ProductItemProps {
  product: Product
  isWide: boolean
}

export const ProductItem: FC<ProductItemProps> = memo(
  ({ product, isWide = false }) => {
    const { name, brand, manufacturer, category_url, url, display_price } =
      product

    const productImage = useMemo(
      () => product.images.find((im) => im.is_main) || product.images[0],
      [product],
    )

    const productOptions = useMemo(
      () =>
        product.menuOptions
          .filter((op) => !op.is_dropdown)
          .sort((a, b) => (a.position < b.position ? -1 : 1)) ?? [],
      [product],
    )

    if (!productImage?.src) {
      return null
    }

    return (
      <article
        className={cn(s.product, {
          [s.wide]: isWide,
        })}
      >
        <FlexImage src={productImage.src} alt={name} maxWidth={400} />

        <div className={s.productBody}>
          <div className={s.productInfo}>
            <Typography tag="h2" size="sm">
              <span dangerouslySetInnerHTML={{ __html: name }} />
            </Typography>

            {brand && <ProductOption name="Бренд" value={brand} />}

            {manufacturer && (
              <ProductOption name="Страна производитель" value={manufacturer} />
            )}

            {productOptions.map(({ id, name, value, is_dropdown }) => (
              <ProductOption
                key={id}
                name={name}
                value={value}
                isDropdown={!!is_dropdown}
              />
            ))}
          </div>

          <div className={s.productButtons}>
            <ButtonLink
              href={`${category_url}/${url}`}
              className={s.productButton}
              size="small"
              uppercase
            >
              Подробнее
            </ButtonLink>

            <Button
              className={s.productButton}
              size="small"
              variant="white"
              uppercase
            >
              {display_price}
            </Button>
          </div>
        </div>
      </article>
    )
  },
)

ProductItem.displayName = 'Product'
