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

import { $itemFiles, deleteItemFileFx, getItemFilesFx } from '@entities/items'
import { ItemFile } from '@entities/items/model'
import { FileModal, getFileIcon } from '@features/upload-item-file'

import { FileManagerProps } from './interfaces'

export const FileManager: React.FC<FileManagerProps> = ({ itemId }) => {
  const [files, loadFiles, removeFile] = useUnit([
    $itemFiles,
    getItemFilesFx,
    deleteItemFileFx,
  ])
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    loadFiles(itemId)
  }, [itemId, loadFiles])

  const deleteFile = (file: ItemFile) => {
    removeFile({ itemId, src: file.src })
  }

  return (
    <Stack spacing={2}>
      {files.length === 0 ? (
        <Typography color='text.secondary'>
          Прикреплённых файлов пока нет
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {files.map((file) => {
            const FileIcon =
              getFileIcon(file.icon) || InsertDriveFileOutlinedIcon

            return (
              <Paper
                key={file.src}
                variant='outlined'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.25,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'text.secondary',
                  }}
                >
                  <FileIcon />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }} noWrap>
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
      )}

      <Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsModal(true)}
        >
          Добавить файл
        </Button>
      </Box>

      <FileModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        itemId={itemId}
      />
    </Stack>
  )
}
