import { ComponentProps, PropsWithChildren } from 'react'

export interface WrapperProps extends PropsWithChildren, ComponentProps<'div'> {
  maxWidth?: string
}
