import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FormModal, FormTextField, RichTextEditor } from '@shared/ui'

import { emptyPageForm, urlList } from './constants'
import { AddPageMenuProps } from './interfaces'
import { changePageSubmitted, createPageSubmitted } from './model'

export const AddPageMenu: React.FC<AddPageMenuProps> = ({
  isOpen,
  title,
  page,
  onClose,
  change,
}) => {
  const [createPage, updatePage] = useUnit([
    createPageSubmitted,
    changePageSubmitted,
  ])
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: emptyPageForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (change) updatePage(values)
    else createPage(values)
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
      title={title}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      {!change ? (
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
      <FormTextField
        control={control}
        name='seoTitle'
        textFieldProps={{ label: 'SEO Title', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='seoDescription'
        textFieldProps={{
          label: 'SEO Description',
          autoComplete: 'off',
          multiline: true,
          maxRows: 8,
        }}
      />
      <FormTextField
        control={control}
        name='seoKeywords'
        textFieldProps={{
          label: 'SEO Keywords',
          autoComplete: 'off',
          multiline: true,
          maxRows: 8,
        }}
      />
    </FormModal>
  )
}
