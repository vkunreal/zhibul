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
  | 'xs'
  | 'xsRelative'
  | 'sm'
  | 'smRelative'
  | 'md'
  | 'mdRelative'
  | 'lg'
  | 'lgRelative'
  | 'xl'
  | 'xlRelative'
  | 'xxl'
  | 'xxlRelative'

export interface TypographyProps extends PropsWithChildren {
  className?: string
  tag?: keyof typeof TitleTags
  size?: TypographySize
  textCenter?: boolean
  uppercase?: boolean
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}
