import cn from 'classnames'
import type { FC } from 'react'

import { TitleTags, TypographyProps } from '../interfaces'
import s from './styles.module.scss'

export const Typography: FC<TypographyProps> = ({
  tag = 'p',
  size = 'md',
  className: propsClassName,
  textCenter,
  uppercase,
  fontWeight,
  children,
}) => {
  const Tag = TitleTags[tag]

  const className = cn(s.typography, s[size], propsClassName, {
    [s.textCenter]: textCenter,
    [s.uppercase]: uppercase,
    [s[`fontWeight${fontWeight}`]]: !!fontWeight,
  })

  return <Tag className={className}>{children}</Tag>
}
