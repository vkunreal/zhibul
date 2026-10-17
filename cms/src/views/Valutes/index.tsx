import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  $valutes,
  changeValuteFx,
  changeValuteSubmitted,
  valutesRequested,
} from '@entities/valutes'
import { Valute } from '@entities/valutes/model'
import { FormModal, FormTextField } from '@shared/ui'

import { emptyValuteForm } from './constants'

export const Valutes = () => {
  const [valutes, loadValutes, submitValute] = useUnit([
    $valutes,
    valutesRequested,
    changeValuteSubmitted,
  ])
  const [selectedValute, setSelectedValute] = useState<Valute | null>(null)
  const [isModal, setIsModal] = useState(false)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyValuteForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (!selectedValute) return

    submitValute({
      id: selectedValute.id,
      value: values.value,
    })
  })

  useEffect(() => {
    loadValutes()
  }, [loadValutes])

  useEffect(() => {
    return changeValuteFx.done.watch(() => {
      setIsModal(false)
    })
  }, [])

  const openEdit = (valute: Valute) => {
    setSelectedValute(valute)
    reset({ value: String(valute.value) })
    setIsModal(true)
  }

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
      <Box>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
          Валюты
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Курсы валют относительно белорусского рубля (BYN)
        </Typography>
      </Box>

      {valutes.length === 0 ? (
        <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
          <Typography color='text.secondary'>Валюты пока не загружены</Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {valutes.map((valute) => (
            <Paper
              key={valute.id}
              variant='outlined'
              sx={{ overflow: 'hidden' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  bgcolor: 'grey.50',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {valute.title}
                </Typography>

                <Tooltip title='Изменить курс'>
                  <IconButton size='small' onClick={() => openEdit(valute)}>
                    <EditOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ px: 2.5, py: 2 }}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ display: 'block', mb: 0.5, letterSpacing: 0.2 }}
                >
                  Курс к BYN
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {valute.value}{' '}
                  <Typography
                    component='span'
                    variant='body2'
                    color='text.secondary'
                    sx={{ fontWeight: 500 }}
                  >
                    BYN
                  </Typography>
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}

      <FormModal
        isOpen={isModal}
        title={
          selectedValute
            ? `Изменение курса ${selectedValute.title}`
            : 'Изменение валюты'
        }
        onClose={() => setIsModal(false)}
        onSubmit={onSubmit}
        cancelText='Отменить'
      >
        <Stack direction='row' spacing={1.5} sx={{ alignItems: 'center' }}>
          <FormTextField
            control={control}
            name='value'
            textFieldProps={{
              label: 'Курс',
              autoComplete: 'off',
              fullWidth: true,
            }}
          />
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ flexShrink: 0, fontWeight: 600 }}
          >
            BYN
          </Typography>
        </Stack>
      </FormModal>
    </Stack>
  )
}
