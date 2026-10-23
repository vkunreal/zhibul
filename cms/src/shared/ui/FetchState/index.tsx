import { Box, CircularProgress, Paper, Typography } from '@mui/material'

import { FetchStateProps } from './interfaces'

import s from './styles.module.scss'

export const FetchState = ({
  loading,
  empty,
  emptyText,
  framed = true,
  children,
}: FetchStateProps) => {
  if (loading && empty) {
    return (
      <Box className={s.pending}>
        <CircularProgress />
      </Box>
    )
  }

  if (empty) {
    if (!framed) {
      return (
        <Typography color='text.secondary' className={s.emptyText}>
          {emptyText}
        </Typography>
      )
    }

    return (
      <Paper variant='outlined' className={s.emptyPaper}>
        <Typography color='text.secondary'>{emptyText}</Typography>
      </Paper>
    )
  }

  return (
    <Box className={s.frame}>
      {loading && (
        <Box className={s.overlay}>
          <CircularProgress />
        </Box>
      )}
      {children}
    </Box>
  )
}
