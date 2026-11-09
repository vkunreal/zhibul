import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

import { TOAST_AUTO_HIDE_MS } from './constants'
import { Toast, ToastKind } from './interfaces'

import s from './styles.module.scss'

type ToastItemProps = {
  toast: Toast
  onClose: (id: string) => void
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const { id, kind, title, description } = toast
  const isLoading = kind === ToastKind.Loading
  const barClass = {
    [ToastKind.Loading]: s.barLoading,
    [ToastKind.Success]: s.barSuccess,
    [ToastKind.Error]: s.barError,
  }[kind]
  const iconClass = {
    [ToastKind.Loading]: s.iconLoading,
    [ToastKind.Success]: s.iconSuccess,
    [ToastKind.Error]: s.iconError,
  }[kind]
  const progressClass = {
    [ToastKind.Loading]: s.progressLoading,
    [ToastKind.Success]: s.progressSuccess,
    [ToastKind.Error]: s.progressError,
  }[kind]

  useEffect(() => {
    const duration = TOAST_AUTO_HIDE_MS[kind]
    if (!duration) return

    const timer = window.setTimeout(() => onClose(id), duration)
    return () => window.clearTimeout(timer)
  }, [id, kind, onClose])

  return (
    <Box className={s.toast}>
      <Box className={[s.bar, barClass].join(' ')} />

      <Box className={s.body}>
        <Box className={[s.icon, iconClass].join(' ')}>
          {isLoading ? (
            <CircularProgress
              size={18}
              thickness={5}
              className={progressClass}
            />
          ) : kind === ToastKind.Success ? (
            <CheckCircleIcon className={s.glyph} />
          ) : (
            <BlockIcon className={s.glyph} />
          )}
        </Box>

        <Box className={s.text}>
          <Typography variant='subtitle2' className={s.title}>
            {title}
          </Typography>
          {description ? (
            <Typography variant='body2' className={s.description}>
              {description}
            </Typography>
          ) : null}
        </Box>

        {!isLoading ? (
          <IconButton
            size='small'
            aria-label='Закрыть'
            onClick={() => onClose(id)}
            className={s.close}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  )
}
