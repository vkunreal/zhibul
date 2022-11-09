import { Button } from '@mui/material'
import { useState } from 'react'
import { IOption } from '../../interfaces/Items'
import './styles.scss'

interface IOptionElemProps {
  id?: string
  option: IOption
}

export const OptionElem: React.FC<IOptionElemProps> = ({ id }) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="option drop d-flex justify-space-between pd-2" id={id}>
      <span className="option-change">z</span>

      <div className="d-flex g-2">
        <div className="d-flex flex-column g-1">
          <p>Название:</p>
          <input
            type="text"
            placeholder="Ввести"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="d-flex flex-column g-1">
          <p>Значение:</p>
          <input
            type="text"
            placeholder="Ввести"
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </div>

      <div className="d-flex align-end g-1">
        <Button variant="outlined" color="warning">
          Изменить
        </Button>

        <Button variant="outlined" color="error">
          Удалить
        </Button>
      </div>
    </div>
  )
}
