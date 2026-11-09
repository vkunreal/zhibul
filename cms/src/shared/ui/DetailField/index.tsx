import { Box, Typography } from '@mui/material'

import { DetailFieldProps } from './interfaces'
import { isEmpty } from './utils'

import s from './styles.module.scss'

export const DetailField = ({ label, children }: DetailFieldProps) => {
  const empty = isEmpty(children)

  return (
    <Box>
      <Typography variant='caption' color='text.secondary' className={s.label}>
        {label}
      </Typography>
      <Typography
        variant='body2'
        component='div'
        className={[s.value, empty && s.valueEmpty].filter(Boolean).join(' ')}
      >
        {empty ? '—' : children}
      </Typography>
    </Box>
  )
}
