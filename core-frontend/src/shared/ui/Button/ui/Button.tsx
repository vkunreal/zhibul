import cn from 'classnames'
import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
} from 'react'

import styles from './styles.module.scss'

interface ButtonShared {
  variant?: 'primary' | 'white'
  size?: 'medium' | 'small'
  uppercase?: boolean
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren &
  ButtonShared

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren &
  ButtonShared

export const Button: FC<ButtonProps> = ({
  type,
  variant = 'primary',
  size = 'medium',
  uppercase = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type={type ?? 'button'}
      className={cn(styles.button, className, styles[variant], styles[size], {
        [styles.uppercase]: uppercase,
      })}
      {...rest}
    >
      {children}
    </button>
  )
}

export const ButtonLink: FC<LinkProps> = ({
  variant = 'primary',
  href = '',
  size = 'medium',
  uppercase = false,
  className,
  children,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className={cn(styles.button, className, styles[variant], styles[size], {
        [styles.uppercase]: uppercase,
      })}
      {...rest}
    >
      {children}
    </Link>
  )
}
