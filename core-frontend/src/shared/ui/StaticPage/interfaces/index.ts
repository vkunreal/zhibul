import { ComponentProps, PropsWithChildren } from 'react'

export interface StaticPageProps
  extends PropsWithChildren,
    ComponentProps<'div'> {
  page: string
}
