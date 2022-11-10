import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { IOption } from '../../interfaces/Items'
import { useDispatch } from 'react-redux'
import { changeOptionDB, deleteOptionDB } from '../../store/options/actions'
import './styles.scss'

interface IOptionElemProps {
  id?: string
  item_id: number
  option: IOption
  onDragStart: any
  onDragLeave: any
  onDragOver: any
  onDrop: any
}

export const OptionElem: React.FC<IOptionElemProps> = ({
  id,
  item_id,
  option,
  onDragStart,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setName(option.name)
    setValue(option.value)
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSave = () => {
    const changeOption = { option_id: option.id || 0, name, value }
    dispatch(changeOptionDB(changeOption, item_id))
  }

  const onDelete = () => {
    dispatch(deleteOptionDB(option.id, item_id))
  }

  return (
    <div
      id={id}
      draggable={true}
      onDragStart={(e) => onDragStart(e, option)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, option)}
    >
      <div className="option drop d-flex justify-space-between pd-2">
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
          <Button variant="outlined" color="success" onClick={onSave}>
            Изменить
          </Button>

          <Button variant="outlined" color="error" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  )
}
