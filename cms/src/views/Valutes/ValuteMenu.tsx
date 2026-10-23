import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { changeValuteFx } from '@entities/valutes'
import { FormModal, FormTextField } from '@shared/ui'

import { emptyValuteForm } from './constants'
import { ValuteMenuProps } from './interfaces'
import { toValuteForm } from './mappers'

import s from './styles.module.scss'

export const ValuteMenu = ({
  valute,
  onSubmit,
  isOpen,
  onClose,
}: ValuteMenuProps) => {
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyValuteForm,
  })

  const submit = handleSubmit((values) => {
    onSubmit(values.value)
  })

  useEffect(() => {
    reset(toValuteForm(valute))
  }, [reset, valute])

  useEffect(() => {
    return changeValuteFx.done.watch(() => {
      onClose()
    })
  }, [onClose])

  return (
    <FormModal
      isOpen={isOpen}
      title={`Изменение курса ${valute.title}`}
      onClose={onClose}
      onSubmit={submit}
      cancelText='Отменить'
    >
      <Stack direction='row' spacing={1.5} className={s.formRow}>
        <FormTextField
          control={control}
          name='value'
          textFieldProps={{
            label: 'Курс',
            autoComplete: 'off',
            fullWidth: true,
          }}
        />
        <Typography variant='body2' color='text.secondary' className={s.unit}>
          BYN
        </Typography>
      </Stack>
    </FormModal>
  )
}
