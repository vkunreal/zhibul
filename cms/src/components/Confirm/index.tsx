import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'

interface IConfirmProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Confirm: React.FC<IConfirmProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent className="d-flex justify-end g-1">
        {children}

        <Button variant="outlined" color="error" onClick={onClose}>
          Отмена
        </Button>
      </DialogContent>
    </Dialog>
  )
}
