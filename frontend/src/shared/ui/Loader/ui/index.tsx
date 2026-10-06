import { CircularProgress } from '@mui/material'
import { FC } from 'react'

import { LoaderProps } from '../interfaces'
import s from './styles.module.scss'

export const Loader: FC<LoaderProps> = props => {
  return (
    <div className={s.loader}>
      <CircularProgress sx={{ color: '#ff7700' }} {...props} />
    </div>
  )
}
