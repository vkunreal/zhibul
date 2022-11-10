import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { IOption, IOptionPosition } from '../../interfaces/Items'
import { changePositionsDB, getOptionsDB } from '../../store/options/actions'
import { selectOptions } from '../../store/options/selectors'
import { OptionElem } from '../OptionElem'
import './styles.scss'

interface IOptionsListProps {
  item_id: number
}

export const OptionsList: React.FC<IOptionsListProps> = ({ item_id }) => {
  const options = useSelector(selectOptions)
  const [items, setItems] = useState<IOption[]>(options)
  const [positions, setPositions] = useState<IOptionPosition[]>([])
  const [currentOption, setCurrentOption] = useState<IOption | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOptionsDB(item_id))
  }, [])

  useEffect(() => {
    console.log(positions)
  }, [positions])

  useEffect(() => {
    setItems(options)
  }, [options])

  const onDragStart = (e: any, option: IOption) => {
    setCurrentOption(option)
  }
  const onDragLeave = (e: any) => {
    e.target.style.transform = 'scale(1)'
  }
  const onDragOver = (e: any) => {
    e.preventDefault()
    e.target.style.transform = 'scale(1.03)'
  }

  const onDrop = (e: any, option: IOption) => {
    if (!currentOption) return
    e.preventDefault()
    e.target.style.transform = 'scale(1)'
    const nItems = items.map((c) => {
      if (c.id === option.id) {
        return { ...c, position: currentOption.position }
      } else if (c.id === currentOption.id) {
        return { ...c, position: option.position }
      }
      return c
    })
    setItems(nItems)
    setPositions(nItems.map((i) => ({ id: i.id || 0, position: i.position })))
  }

  const sortOptions = (a: IOption, b: IOption) => {
    if (a.position > b.position) return 1
    return -1
  }

  const cancelDiffs = () => {
    setItems(options)
  }

  const saveOptionsPostition = () => {
    dispatch(changePositionsDB(positions, item_id))
  }

  return (
    <div>
      {options.length}
      {items.length}
      {!!items.length && (
        <div>
          <h2 className="mb-2">Опции:</h2>

          <div className="options-list d-flex flex-column g-2 mb-4">
            {items.sort(sortOptions).map((option, i) => (
              <OptionElem
                option={option}
                item_id={item_id}
                id={'c' + i}
                key={option.id}
                onDragStart={onDragStart}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            ))}
          </div>

          <div className="d-flex g-2 mt-2 mb-2 fill-width">
            <Button
              variant="outlined"
              color="success"
              onClick={saveOptionsPostition}
            >
              Сохранить
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => cancelDiffs()}
            >
              Отменить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
