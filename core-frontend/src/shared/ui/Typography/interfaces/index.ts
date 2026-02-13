import { PropsWithChildren } from 'react'

export enum TitleTags {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p',
  strong = 'strong',
  small = 'small',
  del = 'del',
}

type TypographySize =
  | 'sm'
  | 'md'
  | 'mdRelative'
  | 'lg'
  | 'xl'
  | 'xlRelative'
  | 'xxl'

export interface TypographyProps extends PropsWithChildren {
  className?: string
  tag?: keyof typeof TitleTags
  size?: TypographySize
  textCenter?: boolean
  upperCase?: boolean
}
