import { FC } from 'react'

import { MAPS_TYPES } from '../interfaces'

export const YandexMap: FC<{ type: MAPS_TYPES }> = ({ type }) => {
  switch (type) {
    case MAPS_TYPES.DELIVERY:
      return (
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A62086dc6fbca1605ca60b02af6b538607abf5eb2f723be2e1d0fb60e2da0b89b&amp;source=constructor"
          width="100%"
          height="720"
          title="yandex_map_delivery"
        />
      )
    case MAPS_TYPES.ADDRESS:
      return (
        <iframe
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=196054484550"
          width="100%"
          height="520"
          title="yandex_map_address"
        />
      )
    default:
      return null
  }
}
