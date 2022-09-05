import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'

interface IDeleteConfirmProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export const DeleteConfirm: React.FC<IDeleteConfirmProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>DELETE USER</DialogTitle>

      <DialogContent>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  )
}
