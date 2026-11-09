import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { useUnit } from 'effector-react'
import { TransitionGroup } from 'react-transition-group'

import { $toasts, toastHidden } from './model'
import { ToastItem } from './ToastItem'

import s from './styles.module.scss'

export const ToastsHost: React.FC = () => {
  const [toasts, hide] = useUnit([$toasts, toastHidden])

  return (
    <Box className={s.host}>
      <TransitionGroup className={s.list}>
        {toasts.map((toast) => (
          <Collapse key={toast.id} timeout={280}>
            <Box className={s.slot}>
              <ToastItem toast={toast} onClose={hide} />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
    </Box>
  )
}
