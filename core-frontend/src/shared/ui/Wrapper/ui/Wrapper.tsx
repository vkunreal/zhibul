import { FC } from 'react'

import { WrapperProps } from '../interfaces'
import styles from './styles.module.scss'

export const Wrapper: FC<WrapperProps> = ({ children, maxWidth, ...rest }) => {
  return (
    <div className={styles.wrapper} {...rest}>
      <div
        className={styles.content}
        style={{
          ...(maxWidth ? { maxWidth } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}
