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
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { FC, forwardRef } from 'react'

import { ModalProps } from '../interfaces'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} timeout={{ enter: 180, exit: 140 }} {...props} />
})

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  actions,
  children,
  showCloseButton = true,
  disableBackdropClose = false,
  disableEscClose = false,
  maxWidth = 'sm',
  fullWidth = true,
  disableContentPadding = false,
  dialogProps,
}) => {
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
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 18px 60px rgba(0,0,0,0.22)',
            backdropFilter: 'blur(6px)',
          },
        },
      }}
      {...dialogProps}
    >
      {(title || showCloseButton) && (
        <DialogTitle>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Box flex={1} minWidth={0}>
              {title && (
                <Typography variant="h6" fontWeight={700} noWrap>
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

      <DialogContent sx={disableContentPadding ? { p: 0 } : undefined}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  )
}
