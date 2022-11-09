import { TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOptionsDB } from '../../store/options/actions'
import { selectOptions } from '../../store/options/selectors'
import { OptionElem } from '../OptionElem'
import './styles.scss'

interface IOptionsListProps {
  item_id: number
}

export const OptionsList: React.FC<IOptionsListProps> = ({ item_id }) => {
  const options = useSelector(selectOptions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOptionsDB(item_id))
  }, [])

  return (
    <div>
      {!!options.length && (
        <div>
          <h2 className="mb-2">Опции:</h2>

          <div className="options-list d-flex flex-column g-2 mb-4">
            {options.map((option, i) => (
              <OptionElem option={option} id={'c' + i} key={option.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
