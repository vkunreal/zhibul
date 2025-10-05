import { FC } from 'react'

import { IconProps } from '../interfaces'

export const Icon: FC<IconProps> = ({ name, ...rest }) => {
  return (
    <svg {...rest}>
      <use xlinkHref={`/icons.svg#${name}`} />
    </svg>
  )
}
