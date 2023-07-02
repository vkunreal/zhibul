import { useState, useEffect } from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
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
  const [isSelectMenu, setIsSelectMenu] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setName(option.name)
    setValue(option.value)
    setIsSelectMenu(!!option.is_dropdown)
    setIsShowMenu(!!option.show_menu)
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSave = () => {
    const changeOption = {
      option_id: option.id || 0,
      name,
      value,
      is_dropdown: isSelectMenu,
      show_menu: isShowMenu,
    }
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
        <div className="d-flex flex-column">
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

          <div className="mt-2">
            <div className="d-flex align-center">
              <Checkbox
                checked={isSelectMenu}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsSelectMenu(!!e.target.checked)
                }
              />

              <span>Сделать выпадающим меню</span>
            </div>

            <div className="d-flex align-center">
              <Checkbox
                checked={isShowMenu}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsShowMenu(!!e.target.checked)
                }
              />

              <span>Показывать в каталоге</span>
            </div>
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
