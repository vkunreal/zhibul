import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { ConfirmProps } from './interfaces'

import s from './styles.module.scss'

export const Confirm: React.FC<ConfirmProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogActions className={s.actions}>
        {children}

        <Button variant='outlined' color='error' onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  )
}
