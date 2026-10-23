import { Box, Typography } from '@mui/material'

import { BackButton } from '../BackButton'

import { DetailHeaderProps } from './interfaces'

import s from './styles.module.scss'

export const DetailHeader = ({
  backLabel,
  onBack,
  title,
  meta,
  chips,
  actions,
}: DetailHeaderProps) => {
  return (
    <Box className={s.header}>
      <Box className={s.main}>
        <BackButton onClick={onBack}>{backLabel}</BackButton>
        <Typography variant='h4' component='h1' className={s.title}>
          {title}
        </Typography>
        {meta ? (
          <Typography variant='body2' color='text.secondary' className={s.meta}>
            {meta}
          </Typography>
        ) : null}
        {chips ? <Box className={s.chips}>{chips}</Box> : null}
      </Box>
      {actions ? <Box className={s.actions}>{actions}</Box> : null}
    </Box>
  )
}
