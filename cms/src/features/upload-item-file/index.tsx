import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { uploadItemFileFx } from '@entities/items'
import { FilePreview } from '@shared/model'
import { FormModal, FormTextField } from '@shared/ui'
import { readFileAsDataUrl } from '@shared/utils'

import { emptyFileForm, icons } from './constants'
import { FileModalProps } from './interfaces'
import { fileUploadSubmitted } from './model'

export { getFileIcon, icons } from './constants'

export const FileModal: React.FC<FileModalProps> = ({
  isOpen,
  onClose,
  itemId,
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [loadedFile, setLoadFile] = useState<FilePreview | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const submitFile = useUnit(fileUploadSubmitted)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyFileForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (!file) return

    submitFile({
      itemId,
      title: values.title,
      icon: values.icon,
      file,
    })
  })

  useEffect(() => {
    return uploadItemFileFx.done.watch(() => {
      reset(emptyFileForm)
      setFile(null)
      setLoadFile(null)
      onClose()
    })
  }, [onClose, reset])

  const handleFileLoad = () => inputRef?.current?.click()

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0]
    if (!nextFile) return

    setFile(nextFile)
    setLoadFile({ name: nextFile.name, src: await readFileAsDataUrl(nextFile) })
  }

  return (
    <FormModal
      isOpen={isOpen}
      title='Добавление файла'
      onClose={onClose}
      onSubmit={onSubmit}
      submitDisabled={!file}
      contentClassName='pt-1'
    >
      <Controller
        name='icon'
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id='items-view__label'>Иконка</InputLabel>
            <Select
              labelId='items-view__label'
              value={field.value}
              onChange={field.onChange}
            >
              {icons.map(({ title, value, id, Icon }) => (
                <MenuItem key={id} value={value}>
                  <Stack
                    direction='row'
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Icon fontSize='small' color='action' />
                    <Box component='span'>{title}</Box>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <FormTextField
        control={control}
        name='title'
        textFieldProps={{ label: 'Название', autoComplete: 'off' }}
      />

      {!!loadedFile && <p>Название файла: {loadedFile.name}</p>}

      <input
        type='file'
        className='d-none'
        accept='application/pdf,application/vnd.ms-excel'
        ref={inputRef}
        onChange={handleChangeInput}
      />

      <Button
        type='button'
        variant='outlined'
        color='warning'
        onClick={handleFileLoad}
      >
        Загрузить файл
      </Button>
    </FormModal>
  )
}
