import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FC } from 'react'

import { ItemDetailsProps } from '../interfaces'

import styles from './styles.module.scss'

const Option = ({ name, value }: { name: string; value: string }) => (
  <div>
    <span>{name}</span>
    <div className="" />
    <span>{value}</span>
  </div>
)

export const ItemDetails: FC<ItemDetailsProps> = ({
  options,
  brand,
  manufacturer,
}) => {
  const visibleOptions = options
    .filter((op) => !op?.is_dropdown && op?.show_item)
    .sort((a, b) => (a.position < b.position ? -1 : 1))

  return (
    <section className={styles.container}>
      <h2>Характеристики товара:</h2>

      {options
        .filter(({ is_dropdown }) => !!is_dropdown)
        .map(({ id, name, value }) => (
          <FormControl key={id} fullWidth size="small">
            <InputLabel id={`${name}-label`}>{name}</InputLabel>
            <Select labelId={`${name}-label`}>
              {value.split('-').map((valueOption) => (
                <MenuItem key={valueOption}>{valueOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}

      <Option name="Бренд" value={brand} />

      <Option name="Страна производитель" value={manufacturer} />

      {visibleOptions.map(({ id, name, value }) => (
        <Option key={id} name={name} value={value} />
      ))}
    </section>
  )
}
