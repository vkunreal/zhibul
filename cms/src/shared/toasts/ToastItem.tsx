import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

import { TOAST_ACCENT, TOAST_AUTO_HIDE_MS } from './constants'
import { Toast, ToastKind } from './interfaces'

type ToastItemProps = {
  toast: Toast
  onClose: (id: string) => void
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const { id, kind, title, description } = toast
  const accent = TOAST_ACCENT[kind]
  const isLoading = kind === ToastKind.Loading

  useEffect(() => {
    const duration = TOAST_AUTO_HIDE_MS[kind]
    if (!duration) return

    const timer = window.setTimeout(() => onClose(id), duration)
    return () => window.clearTimeout(timer)
  }, [id, kind, onClose])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.25,
        minWidth: 320,
        maxWidth: 420,
        bgcolor: '#fff',
        borderRadius: 1.5,
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
        overflow: 'hidden',
        border: '1px solid rgba(15, 23, 42, 0.06)',
      }}
    >
      <Box
        sx={{
          width: '2px',
          alignSelf: 'stretch',
          flexShrink: 0,
          bgcolor: accent,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.25,
          flex: 1,
          py: 1.25,
          pr: 0.5,
          pl: 0.25,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 0.15,
            color: accent,
          }}
        >
          {isLoading ? (
            <CircularProgress size={18} thickness={5} sx={{ color: accent }} />
          ) : kind === ToastKind.Success ? (
            <CheckCircleIcon sx={{ fontSize: 20 }} />
          ) : (
            <BlockIcon sx={{ fontSize: 20 }} />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, pr: 0.5 }}>
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.35 }}
          >
            {title}
          </Typography>
          {description ? (
            <Typography
              variant='body2'
              sx={{ mt: 0.25, color: '#64748b', lineHeight: 1.4 }}
            >
              {description}
            </Typography>
          ) : null}
        </Box>

        {!isLoading ? (
          <IconButton
            size='small'
            aria-label='Закрыть'
            onClick={() => onClose(id)}
            sx={{ color: '#94a3b8', mt: -0.25 }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  )
}
