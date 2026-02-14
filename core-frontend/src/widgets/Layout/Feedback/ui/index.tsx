'use client'

import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Wrapper } from '@/shared/ui'

import { FIELDS_CONFIGURATION } from '../config'
import { FeedbackData } from '../interfaces'

import styles from './styles.module.scss'

const WhiteButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: 'rgba(0, 0, 0, 0.87)',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
})

export const Feedback: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FeedbackData>()

  const onSubmit = (data: FeedbackData) => {
    console.log(data)
  }

  return (
    <Wrapper className={styles.wrapper} maxWidth="900px">
      <div className={styles.feedback}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Есть вопросы или необходима консультация?
          </h2>
          <p className={styles.description}>
            Заполните форму и наш специалист ответит на все возникшие вопросы!
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

          <WhiteButton
            type="submit"
            variant="contained"
            style={{ marginTop: 23 }}
            fullWidth
            disabled={!isValid}
            size="large"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </WhiteButton>
        </form>
      </div>
    </Wrapper>
  )
}
