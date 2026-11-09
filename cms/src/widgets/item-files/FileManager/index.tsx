import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import {
  $itemFiles,
  deleteItemFileFx,
  deleteItemFilesFx,
  getItemFilesFx,
} from '@entities/items'
import { ItemFile } from '@entities/items/model'
import { getFileIcon } from '@features/upload-item-file'
import { Confirm, FetchState } from '@shared/ui'

import { FileManagerProps } from './interfaces'

import s from './styles.module.scss'

export const FileManager: React.FC<FileManagerProps> = ({ itemId }) => {
  const [files, loading, loadFiles, removeFile, removeFiles] = useUnit([
    $itemFiles,
    getItemFilesFx.pending,
    getItemFilesFx,
    deleteItemFileFx,
    deleteItemFilesFx,
  ])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { open } = useModal()

  useEffect(() => {
    loadFiles(itemId)
  }, [itemId, loadFiles])

  const deleteFile = (file: ItemFile) => {
    removeFile({ itemId, src: file.src })
  }

  return (
    <Stack spacing={2}>
      <FetchState
        loading={loading}
        empty={files.length === 0}
        emptyText='Прикреплённых файлов пока нет'
        framed={false}
      >
        <Stack spacing={1.25}>
          {files.map((file) => {
            const FileIcon =
              getFileIcon(file.icon) || InsertDriveFileOutlinedIcon

            return (
              <Paper key={file.src} variant='outlined' className={s.file}>
                <Box className={s.fileIcon}>
                  <FileIcon />
                </Box>
                <Box className={s.fileBody}>
                  <Typography variant='body2' className={s.fileTitle} noWrap>
                    {file.title || 'Без названия'}
                  </Typography>
                </Box>
                <Button
                  size='small'
                  href={file.src}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Открыть
                </Button>
                <Tooltip title='Удалить'>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => deleteFile(file)}
                  >
                    <DeleteOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Paper>
            )
          })}
        </Stack>
      </FetchState>

      <Stack direction='row' spacing={1} className={s.actions}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => open('fileModal', { itemId })}
        >
          Добавить файл
        </Button>
        {files.length > 0 && (
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteOutlinedIcon />}
            onClick={() => setDeleteDialog(true)}
          >
            Удалить все файлы
          </Button>
        )}
      </Stack>

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title='Вы точно хотите удалить все файлы?'
      >
        <Button
          variant='outlined'
          color='success'
          onClick={() => {
            setDeleteDialog(false)
            removeFiles(itemId)
          }}
        >
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
