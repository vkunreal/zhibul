import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { IChangeOption } from '../../store/options/interfaces'
import { useDispatch } from 'react-redux'

interface IAddOptionMenuProps {
  isOpen: boolean
  item_id: number
  onClose: () => void
  addOption: (option: IChangeOption) => void
}

export const AddOptionMenu: React.FC<IAddOptionMenuProps> = ({
  isOpen,
  item_id,
  addOption,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление опции</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <TextField
          placeholder="Название"
          value={name}
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextField
          placeholder="Значение"
          value={value}
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              addOption({ name, value })
              setName('')
              setValue('')
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
