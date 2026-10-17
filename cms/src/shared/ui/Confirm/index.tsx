import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material'

import { ConfirmProps } from './interfaces'

export const Confirm: React.FC<ConfirmProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {children}

        <Button variant='outlined' color='error' onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}
