import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../../utils/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

interface IValute {
  id: number
  title: string
  value: number
}

export const Valutes = () => {
  const [valutes, setValutes] = useState<IValute[]>([])
  const [changeValute, setChangeValute] = useState<IValute | null>(null)
  const [value, setValue] = useState('')
  const [isModal, setIsModal] = useState(false)

  const fetchData = async () => {
    const valutesData = await axios.get(`${API}/api/valutes`)

    setValutes(valutesData.data)
  }

  const changeValuteValue = async () => {
    await axios.put(`${API}/api/valutes`, {
      id: changeValute?.id,
      value,
    })

    setIsModal(false)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="pd-4">
      <h1>Валюты</h1>

      <div className="d-flex flex-column g-2 mt-2">
        {!!valutes.length &&
          valutes.map((valute) => (
            <div
              className="d-flex justify-space-between pd-2"
              style={{ border: '1px solid #ccc' }}
              key={valute.id}
            >
              <div>
                <p>
                  ID: <b>{valute.title}</b>
                </p>
                <p className="mt-1">Значение: {valute.value} BLR</p>
              </div>

              <Button
                variant="outlined"
                onClick={() => {
                  setChangeValute(valute)
                  setValue(String(valute.value))
                  setIsModal(true)
                }}
              >
                Изменить
              </Button>
            </div>
          ))}
      </div>

      <Dialog open={isModal} onClose={() => setIsModal(false)} fullWidth>
        <DialogTitle>Изменение валюты</DialogTitle>

        <DialogContent className="d-flex flex-column g-3 pt-1">
          <div className="d-flex align-center g-2">
            <TextField
              className="fill-width"
              label="Значение"
              value={value}
              autoComplete="off"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value)
              }}
            />
            <span>BLR</span>
          </div>

          <div className="d-flex justify-end g-1">
            <Button
              variant="outlined"
              color="success"
              onClick={changeValuteValue}
            >
              Сохранить
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsModal(false)}
            >
              Отменить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
