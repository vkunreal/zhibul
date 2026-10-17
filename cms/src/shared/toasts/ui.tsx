import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { useUnit } from 'effector-react'
import { TransitionGroup } from 'react-transition-group'

import { $toasts, toastHidden } from './model'
import { ToastItem } from './ToastItem'

export const ToastsHost: React.FC = () => {
  const [toasts, hide] = useUnit([$toasts, toastHidden])

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        maxHeight: 'calc(100vh - 32px)',
        overflow: 'hidden',
      }}
    >
      <TransitionGroup
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
          gap: 0,
        }}
      >
        {toasts.map((toast) => (
          <Collapse key={toast.id} timeout={280}>
            <Box sx={{ pb: 1, pointerEvents: 'auto' }}>
              <ToastItem toast={toast} onClose={hide} />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
    </Box>
  )
}
