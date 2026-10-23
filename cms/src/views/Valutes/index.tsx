import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import {
  $valutes,
  changeValuteSubmitted,
  getValutesFx,
  valutesRequested,
} from '@entities/valutes'
import { Valute } from '@entities/valutes/model'
import { FetchState, PageHeader, Panel } from '@shared/ui'

import s from './styles.module.scss'

export const Valutes = () => {
  const { open } = useModal()
  const [valutes, loading, loadValutes, submitValute] = useUnit([
    $valutes,
    getValutesFx.pending,
    valutesRequested,
    changeValuteSubmitted,
  ])

  useEffect(() => {
    loadValutes()
  }, [loadValutes])

  const openEdit = (valute: Valute) => {
    open('valuteModal', {
      valute,
      onSubmit: (value) => submitValute({ id: valute.id, value }),
    })
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Валюты'
        subtitle='Курсы валют относительно белорусского рубля (BYN)'
      />

      <FetchState
        loading={loading}
        empty={valutes.length === 0}
        emptyText='Валюты пока не загружены'
      >
        <Stack spacing={1.5}>
          {valutes.map((valute) => (
            <Panel
              key={valute.id}
              title={
                <Typography variant='subtitle1' className={s.code}>
                  {valute.title}
                </Typography>
              }
              actions={
                <Tooltip title='Изменить курс'>
                  <IconButton size='small' onClick={() => openEdit(valute)}>
                    <EditOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              }
            >
              <Typography
                variant='caption'
                color='text.secondary'
                className={s.fieldLabel}
              >
                Курс к BYN
              </Typography>
              <Typography variant='h6' className={s.rate}>
                {valute.value}{' '}
                <Typography
                  component='span'
                  variant='body2'
                  color='text.secondary'
                  className={s.rateUnit}
                >
                  BYN
                </Typography>
              </Typography>
            </Panel>
          ))}
        </Stack>
      </FetchState>
    </Stack>
  )
}
