import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import { FlexImageProps } from '../interfaces'

import styles from './styles.module.scss'

export const FlexImage: FC<FlexImageProps> = ({
  wrapperClassName,
  className,
  alt,
  maxWidth,
  ...props
}) => {
  return (
    <div
      className={cn(styles.wrapper, wrapperClassName)}
      style={{
        maxWidth,
      }}
    >
      <Image
        className={cn(styles.image, className)}
        fill
        alt={alt}
        sizes="(max-width: 768px) 100vw, 50vw"
        {...props}
      />
    </div>
  )
}
