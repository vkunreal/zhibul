import { FC } from 'react'

import { WrapperProps } from '../interfaces'
import s from './styles.module.scss'

export const Wrapper: FC<WrapperProps> = ({ children, maxWidth, ...rest }) => {
  return (
    <div className={s.wrapper} {...rest}>
      <div
        className={s.content}
        style={{
          ...(maxWidth ? { maxWidth } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}
