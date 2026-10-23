import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FormModal, FormTextField, RichTextEditor, SeoFields } from '@shared/ui'

import { emptyPageForm, urlList } from './constants'
import { AddPageMenuProps } from './interfaces'

export const AddPageMenu: React.FC<AddPageMenuProps> = ({
  isOpen,
  page,
  onClose,
  onSubmit: submitPage,
}) => {
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: emptyPageForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitPage(values)
    reset(emptyPageForm)
    onClose()
  })

  useEffect(() => {
    reset(page ?? emptyPageForm)
  }, [isOpen, page, reset])

  const url = watch('url')

  return (
    <FormModal
      isOpen={isOpen}
      title={page ? 'Изменение страницы' : 'Добавление страницы'}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      {!page ? (
        <Controller
          name='url'
          control={control}
          render={({ field }) => (
            <FormControl variant='standard' fullWidth>
              <InputLabel id='change-variable-label'>Страница</InputLabel>
              <Select
                labelId='change-variable-label'
                value={field.value}
                onChange={field.onChange}
              >
                {urlList.map(({ url, name }) => (
                  <MenuItem key={url} value={url}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      ) : (
        <p>
          <b>URL:</b> {url}
        </p>
      )}

      <FormTextField
        control={control}
        name='name'
        textFieldProps={{ label: 'Название', autoComplete: 'off' }}
      />
      <Controller
        name='text'
        control={control}
        render={({ field }) => (
          <RichTextEditor
            label='Текст'
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <SeoFields
        control={control}
        descriptionProps={{ multiline: true, maxRows: 8 }}
        keywordsProps={{ multiline: true, maxRows: 8 }}
      />
    </FormModal>
  )
}
