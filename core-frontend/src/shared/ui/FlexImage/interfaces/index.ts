import Image from 'next/image'
import { ComponentProps } from 'react'

export interface FlexImageProps extends Omit<
  ComponentProps<typeof Image>,
  'fill'
> {
  wrapperClassName?: string
  className?: string
  maxWidth: number
}
