import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { FileModal } from '../FileModal'
import axios from 'axios'
import API from '../../utils/api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../store/variables/selectors'

export const FileManager: React.FC<any> = ({ item_id }) => {
  const [files, setFiles] = useState<any[]>([])
  const [isModal, setIsModal] = useState(false)

  const token = useSelector(selectToken)

  useEffect(() => {
    async function fetch() {
      const filesData = await axios.get(API + `/api/files/${item_id}/`)
      setFiles(filesData.data)
    }
    fetch()
  }, [])

  const onModalClose = async () => {
    const filesData = await axios.get(API + `/api/files/${item_id}/`)
    setFiles(filesData.data)
    setIsModal(false)
  }

  const deleteFile = async (item: any) => {
    await axios.delete(API + '/api/file/', {
      headers: {
        authorization: token,
      },
      data: { src: item.src },
    })

    const filesData = await axios.get(API + `/api/files/${item_id}/`)
    setFiles(filesData.data)
  }

  return (
    <div>
      <h2>Прикрепленные файлы:</h2>

      <div className="d-flex flex-column g-2 pr-1 mt-2 mb-0">
        {files.map((item) => (
          <div
            className="d-flex flex-column g-1 pd-2"
            style={{ border: '1px solid #ccc', maxWidth: 350 }}
          >
            <a href={item.src} target="_blank">
              Ссылка
            </a>

            <p>Иконка: {item.icon}</p>

            <p>Название: {item.title}</p>

            <Button
              variant="outlined"
              color="error"
              style={{ width: '35%' }}
              onClick={() => deleteFile(item)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>

      <Button
        className="mt-2"
        variant="outlined"
        color="success"
        onClick={() => setIsModal(true)}
      >
        Добавить файл
      </Button>

      <FileModal isOpen={isModal} onClose={onModalClose} item_id={item_id} />
    </div>
  )
}
