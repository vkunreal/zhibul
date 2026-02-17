'use client'

import { TextField } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { SendFeedbackDTO } from '@/entities/feedback'

import { FIELDS_CONFIGURATION } from '../../config'
import { FeedbackFormProps } from '../../interfaces'
import { useSendFeedback } from '../../model'

import styles from './styles.module.scss'

export const FeedbackForm: FC<FeedbackFormProps> = ({
  sendButton: SendButton,
  short,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendFeedbackDTO>()

  const { send } = useSendFeedback()

  return (
    <form className={styles.form} onSubmit={handleSubmit(send)}>
      <TextField
        label="Имя *"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="standard"
        {...register('name', FIELDS_CONFIGURATION.name)}
      />

      <Controller
        name="phone"
        control={control}
        rules={FIELDS_CONFIGURATION.phone}
        render={({ field, fieldState }) => (
          <PatternFormat
            {...field}
            format="+375 (##) ###-##-##"
            mask="_"
            customInput={TextField}
            label="Телефон *"
            variant="standard"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {!short && (
        <>
          <TextField
            label="Компания"
            variant="standard"
            fullWidth
            error={!!errors.company}
            helperText={errors.company?.message}
            {...register('company')}
          />

          <TextField
            label="E-mail"
            variant="standard"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', FIELDS_CONFIGURATION.email)}
          />

          <TextField
            label="Комментарий"
            multiline
            rows={4}
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment?.message}
            variant="standard"
            {...register('comment')}
          />
        </>
      )}

      <SendButton
        type="submit"
        variant="contained"
        style={{ marginTop: 23 }}
        fullWidth
        disabled={!isValid}
        size="large"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </SendButton>
    </form>
  )
}
