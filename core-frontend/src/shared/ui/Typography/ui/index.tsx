import cn from 'classnames'
import type { FC } from 'react'

import { TitleTags, TypographyProps } from '../interfaces'

import styles from './styles.module.scss'

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

  const className = cn(styles.typography, styles[size], propsClassName, {
    [styles.textCenter]: textCenter,
    [styles.uppercase]: uppercase,
    [styles[`fontWeight${fontWeight}`]]: !!fontWeight,
  })

  return <Tag className={className}>{children}</Tag>
}
