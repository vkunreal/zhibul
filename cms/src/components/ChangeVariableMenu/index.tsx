import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { IVariable } from '../../interfaces/App'

interface IChangeVariableMenuProps {
  variable: IVariable | null
  isOpen: boolean
  saveVariable: (variable: IVariable) => void
  onClose: () => void
}

const VariableTypes = [
  'phone',
  'address',
  'work_time',
  'years',
  'clients',
  'partners',
  'repair_done',
]

export const ChangeVariableMenu: React.FC<IChangeVariableMenuProps> = ({
  isOpen,
  variable,
  saveVariable,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    setName(variable?.name || '')
    setValue(variable?.value || '')
  }, [variable])

  const handleNameChange = (e: SelectChangeEvent) => {
    setName(e.target.value as string)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Изменение переменной</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <FormControl fullWidth>
          <Select
            labelId="items-view__label"
            value={name}
            onChange={handleNameChange}
          >
            {VariableTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Значение"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            disabled={!name.trim() || !value.trim()}
            onClick={() => {
              const newVariable = { id: 0, ...variable, name, value }
              saveVariable(newVariable)
            }}
          >
            Сохранить
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
