import { Box, CircularProgress, Typography } from '@mui/material'

import { GalleryProps } from './interfaces'

import s from './styles.module.scss'

export const Gallery = ({
  loading = false,
  empty,
  emptyText,
  children,
}: GalleryProps) => {
  return (
    <Box className={s.root}>
      {loading && empty ? (
        <Box className={s.loader}>
          <CircularProgress />
        </Box>
      ) : empty ? (
        <Typography color='text.secondary' className={s.empty}>
          {emptyText}
        </Typography>
      ) : null}
      {children}
    </Box>
  )
}
