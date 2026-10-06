import { FC } from 'react'

import { SelectOption } from '@/features/item/selectOption'

import { notoSerif } from '@/shared/assets'
import { Typography } from '@/shared/ui'

import { ProductDetailsProps } from '../interfaces'
import { Option } from './Option'
import s from './styles.module.scss'

export const ProductDetails: FC<ProductDetailsProps> = ({
  options,
  brand,
  manufacturer,
  displayPrice,
}) => {
  const visibleOptions = options
    .filter((op) => !op.is_dropdown && op.show_item)
    .sort((a, b) => (a.position < b.position ? -1 : 1))

  return (
    <section className={s.container}>
      <Typography tag="h2" size="xl">
        Характеристики товара:
      </Typography>

      {options
        .filter(({ is_dropdown }) => !!is_dropdown)
        .map((option) => (
          <SelectOption key={option.id} option={option} />
        ))}

      <Option name="Бренд" value={brand} />

      <Option name="Страна производитель" value={manufacturer} />

      {visibleOptions.map(({ id, name, value }) => (
        <Option key={id} name={name} value={value} />
      ))}

      <div className={s.price}>
        <p>Стоимость: {displayPrice}</p>
      </div>
    </section>
  )
}
