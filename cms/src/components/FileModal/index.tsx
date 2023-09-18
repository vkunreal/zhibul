import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useRef, useState } from 'react'
import API from '../../utils/api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/variables/selectors'

const defaultState = {
  title: '',
  icon: '',
  file: null,
}

export const FileModal: React.FC<any> = ({ isOpen, onClose, item_id }) => {
  const [fileData, setFileData] = useState<any>(defaultState)
  const [loadedFile, setLoadFile] = useState<any>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const token = useSelector(selectToken)

  const handleFileLoad = () => inputRef?.current?.click()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef || !e.target.files?.length) return
    const file = Array.from(e.target.files)[0]
    setFileData((prev: any) => ({ ...prev, file }))

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = (e.target as any).result
      setLoadFile({ name: file.name, result })
    }
    reader.readAsDataURL(file)
  }

  const sendFile = async () => {
    if (!loadedFile) return
    const formData = new FormData()

    formData.append(fileData.file.name, fileData.file)
    formData.append('item_id', item_id)
    formData.append('icon', fileData.icon)
    formData.append('title', fileData.title)

    const res = await fetch(API + '/api/file/', {
      method: 'POST',
      body: formData,
      headers: {
        authorization: token,
      },
    })

    if (res.status === 201) {
      console.log('Файл добавлен')
    }

    setFileData(defaultState)
    setLoadFile(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Добавление файла</DialogTitle>

      <DialogContent className="d-flex flex-column g-3 pt-1">
        <TextField
          label="Иконка"
          autoComplete="off"
          value={fileData.icon}
          onChange={(e) =>
            setFileData((prev: any) => ({ ...prev, icon: e.target.value }))
          }
        />

        <TextField
          label="Название"
          autoComplete="off"
          value={fileData.title}
          onChange={(e) =>
            setFileData((prev: any) => ({ ...prev, title: e.target.value }))
          }
        />

        {!!loadedFile && <p>Название файла: {loadedFile.name}</p>}

        <input
          type="file"
          className="d-none"
          accept="application/pdf,application/vnd.ms-excel"
          ref={inputRef}
          onChange={handleChangeInput}
        />

        <div className="d-flex flex-column g-2">
          <Button variant="outlined" color="warning" onClick={handleFileLoad}>
            Загрузить файл
          </Button>

          <Button variant="outlined" color="success" onClick={sendFile}>
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
