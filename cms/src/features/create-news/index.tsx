import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { addNewsFx, emptyNewsForm } from '@entities/news'
import { FormModal, FormTextField, RichTextEditor, SeoFields } from '@shared/ui'

import { AddNewsItemProps } from './interfaces'
import { createNewsSubmitted } from './model'

export const AddNewsItem: React.FC<AddNewsItemProps> = ({
  isOpen,
  onClose,
}) => {
  const submitNews = useUnit(createNewsSubmitted)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyNewsForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitNews(values)
  })

  useEffect(() => {
    return addNewsFx.done.watch(() => {
      reset(emptyNewsForm)
      onClose()
    })
  }, [onClose, reset])

  return (
    <FormModal
      isOpen={isOpen}
      title='Добавление новости'
      onClose={onClose}
      onSubmit={onSubmit}
      submitText='Добавить'
      contentClassName='pt-1'
    >
      <FormTextField
        control={control}
        name='url'
        textFieldProps={{ label: 'URL', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='title'
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
        name='shortText'
        textFieldProps={{
          label: 'Короткий текст',
          autoComplete: 'off',
          multiline: true,
          maxRows: 8,
        }}
      />
      <SeoFields control={control} />
    </FormModal>
  )
}
