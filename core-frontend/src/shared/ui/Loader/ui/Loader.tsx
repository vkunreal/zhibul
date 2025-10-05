import { FC } from 'react'
import { CircularProgress } from '@mui/material'

import { LoaderProps } from '../interfaces'
import styles from './styles.module.scss'

export const Loader: FC<LoaderProps> = props => {
  return (
    <div className={styles.loader}>
      <CircularProgress sx={{ color: '#ff7700' }} {...props} />
    </div>
  )
}
