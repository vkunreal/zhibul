import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'
import { getTokenDB } from '../../store/variables/actions'
import { useNavigate } from 'react-router-dom'
import { selectToken } from '../../store/variables/selectors'

export const AuthPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const token = useSelector(selectToken)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  const login = () => {
    dispatch(getTokenDB(name, password))
    navigate('/')
  }

  const isDisabled = () => {
    return !name.trim().length || !password.trim().length
  }

  return (
    <div className="pd-4">
      <h2>Авторизация</h2>

      <div className="d-flex flex-column g-2 mt-4">
        <TextField
          label="Логин"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Пароль"
          type="password"
          autoComplete="off"
          inputProps={{ maxLength: 32 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <Button
            variant="outlined"
            className="pl-2 pr-2"
            disabled={isDisabled()}
            onClick={login}
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  )
}
