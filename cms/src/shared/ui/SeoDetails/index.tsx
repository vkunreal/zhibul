import { Stack, Typography } from '@mui/material'

import { DetailField } from '../DetailField'

import { SeoDetailsProps } from './interfaces'

import s from './styles.module.scss'

export const SeoDetails = ({
  title,
  description,
  keywords,
}: SeoDetailsProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography variant='subtitle1' className={s.title}>
        SEO
      </Typography>
      <DetailField label='Title'>{title}</DetailField>
      <DetailField label='Description'>{description}</DetailField>
      <DetailField label='Keywords'>{keywords}</DetailField>
    </Stack>
  )
}
