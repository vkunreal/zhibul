import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { IVariable, variablesList } from '../../interfaces/App'

interface IChangeVariableMenuProps {
  title: string
  variable?: IVariable | null
  isOpen: boolean
  saveVariable: (variable: IVariable) => void
  onClose: () => void
}

export const ChangeVariableMenu: React.FC<IChangeVariableMenuProps> = ({
  isOpen,
  title,
  variable,
  saveVariable,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    setName(variable?.name || '')
    setValue(variable?.value || '')
  }, [isOpen])

  const handleNameChange = (e: SelectChangeEvent) => {
    setName(e.target.value as string)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="change-variable-label">Переменная</InputLabel>

          <Select
            labelId="change-variable-label"
            value={name}
            onChange={handleNameChange}
          >
            {variablesList.map(({ type, name }) => (
              <MenuItem key={type} value={type}>
                {name}
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
