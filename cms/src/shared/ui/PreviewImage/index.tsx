import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, Chip, IconButton, Paper } from '@mui/material'

import { PreviewImageProps } from './interfaces'

import s from './styles.module.scss'

export const PreviewImage = ({
  src,
  pending = false,
  onRemove,
  children,
}: PreviewImageProps) => {
  return (
    <Paper
      variant='outlined'
      className={[s.card, pending && s.pending].filter(Boolean).join(' ')}
    >
      {onRemove ? (
        <IconButton size='small' onClick={onRemove} className={s.remove}>
          <CloseOutlinedIcon fontSize='small' />
        </IconButton>
      ) : null}
      <Box component='img' src={src} alt='' className={s.image} />
      {pending ? (
        <Box className={s.caption}>
          <Chip size='small' color='success' label='Новое' className={s.chip} />
        </Box>
      ) : children ? (
        <Box className={s.footer}>{children}</Box>
      ) : null}
    </Paper>
  )
}
