'use client'

import styled from '@emotion/styled'
import { TextField, Button } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Modal } from '@/shared/ui'

import { FIELDS_CONFIGURATION } from '../config'
import { CallBackData, SendCallBackModalProps } from '../interfaces'

const SendButton = styled(Button)({
  backgroundColor: '#2c2c2c',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
})

export const SendCallBackModal: FC<SendCallBackModalProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CallBackData>()

  const onSubmit = (data: CallBackData) => {
    console.log(data)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Закажите обратный звонок"
      subtitle="Заполните форму и наш специалист перезвонит вам"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </Modal>
  )
}
