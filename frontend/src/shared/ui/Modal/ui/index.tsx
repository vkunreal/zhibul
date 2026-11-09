'use client'

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Fade,
  IconButton,
  Slide,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { FC, forwardRef, useRef } from 'react'

import { ModalProps } from '../interfaces'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} timeout={{ enter: 180, exit: 140 }} {...props} />
})

const SheetTransition = forwardRef(function SheetTransition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  titleAlign = 'left',
  titleFontSize,
  subtitle,
  actions,
  children,
  showCloseButton = true,
  disableBackdropClose = false,
  disableEscClose = false,
  maxWidth = 'sm',
  fullWidth = true,
  width,
  disableContentPadding = false,
  sheet = false,
  dialogProps,
}) => {
  // Sheet below 768px. From the slider breakpoint the dialog stays centered.
  const narrowScreen = useMediaQuery('(max-width: 767px)', { noSsr: true })
  const asSheet = sheet && narrowScreen
  // Анимацию фиксируем на момент открытия. Смена Slide/Fade при ресайзе
  // размонтирует содержимое и сбрасывает состояние шага.
  const transitionSheet = useRef(asSheet)

  if (!open) transitionSheet.current = asSheet

  const animateAsSheet = transitionSheet.current

  const handleClose: DialogProps['onClose'] = (_event, reason) => {
    if (reason === 'backdropClick' && disableBackdropClose) return
    if (reason === 'escapeKeyDown' && disableEscClose) return
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      maxWidth={asSheet ? false : maxWidth}
      fullWidth={asSheet ? false : fullWidth}
      slots={{
        transition: animateAsSheet ? SheetTransition : Transition,
      }}
      sx={{
        zIndex: 1600,
        ...(asSheet
          ? {
              '& .MuiDialog-container': {
                alignItems: 'flex-end',
              },
            }
          : {}),
      }}
      slotProps={{
        paper: {
          sx: asSheet
            ? {
                m: 0,
                width: '100%',
                maxWidth: '100%',
                height: '78vh',
                maxHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px 16px 0 0',
                overflow: 'hidden',
                boxShadow: '0 18px 60px rgba(0,0,0,0.22)',
                pb: 'env(safe-area-inset-bottom)',
              }
            : {
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 18px 60px rgba(0,0,0,0.22)',
                backdropFilter: 'blur(6px)',
                ...(width != null && { width, maxWidth: 'calc(100% - 64px)' }),
              },
        },
      }}
      {...dialogProps}
    >
      {asSheet && (
        <Box
          sx={{
            width: 36,
            height: 4,
            borderRadius: 999,
            bgcolor: '#c8c8c8',
            mx: 'auto',
            mt: 1.5,
            flexShrink: 0,
          }}
        />
      )}
      {(title || showCloseButton) && (
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {title && (
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    textAlign: titleAlign,
                    fontSize: titleFontSize,
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {showCloseButton && (
              <IconButton
                aria-label="Close"
                onClick={onClose}
                size="small"
                sx={{ mt: 0.5 }}
              >
                <span
                  style={{
                    fontSize: 24,
                    width: 24,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  &times;
                </span>
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          ...(disableContentPadding ? { p: 0 } : {}),
          ...(asSheet
            ? { flex: 1, display: 'flex', flexDirection: 'column' }
            : {}),
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  )
}
