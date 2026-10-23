import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Button, Divider, Stack } from '@mui/material'

import { DetailField, Panel } from '@shared/ui'

import { ConfigurePropertiesProps, StatusValueProps } from './interfaces'

import s from './styles.module.scss'

const StatusValue = ({ on, label }: StatusValueProps) => (
  <span className={s.status}>
    <span className={[s.dot, on ? s.dotOn : s.dotOff].join(' ')} />
    {label}
  </span>
)

export const ConfigureProperties = ({
  item,
  valuteTitle,
  onEdit,
}: ConfigurePropertiesProps) => {
  return (
    <Panel
      title='Свойства'
      actions={
        <Button
          size='small'
          variant='outlined'
          startIcon={<EditOutlinedIcon />}
          onClick={onEdit}
        >
          Изменить
        </Button>
      }
    >
      <Stack spacing={2} divider={<Divider />}>
        <DetailField label='Статус'>
          <StatusValue
            on={item.isActive}
            label={item.isActive ? 'Активен' : 'Не активен'}
          />
        </DetailField>
        <DetailField label='Наличие'>
          <StatusValue
            on={!item.isOrderOnly}
            label={item.isOrderOnly ? 'Под заказ' : 'В наличии'}
          />
        </DetailField>
        <DetailField label='Категория'>{item.categoryName}</DetailField>
        <DetailField label='Бренд'>{item.brand}</DetailField>
        <DetailField label='Производитель'>{item.manufacturer}</DetailField>
        <DetailField label='Описание'>{item.description}</DetailField>
        <DetailField label='Цена на сайте'>{item.displayPrice}</DetailField>
        <DetailField label='Цена'>{item.price}</DetailField>
        <DetailField label='Валюта'>{valuteTitle}</DetailField>
        <DetailField label='Закупочная цена'>{item.purchasePrice}</DetailField>
        <DetailField label='Рентабельность'>{item.profitability}</DetailField>
        <DetailField label='Постфикс цены'>{item.pricePostfix}</DetailField>
      </Stack>
    </Panel>
  )
}
