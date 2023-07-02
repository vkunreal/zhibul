import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ICategoryCandidate } from '../../interfaces/Items'

interface IAddMenuProps {
  isOpen: boolean
  parent_id: number | null
  onClose: () => void
  addCategory: (category: ICategoryCandidate) => void
}

export const AddMenu: React.FC<IAddMenuProps> = ({
  isOpen,
  parent_id,
  onClose,
  addCategory,
}) => {
  const [name, setName] = useState('')

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление категории</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <TextField
          label="Название"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              addCategory({ name, parent_id })
            }}
          >
            Добавить
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
