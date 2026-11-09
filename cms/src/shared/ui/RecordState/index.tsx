import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material'

import { BackButton } from '../BackButton'

import { RecordStateProps } from './interfaces'

import s from './styles.module.scss'

export const RecordState = ({
  className,
  backLabel,
  onBack,
  missing,
  missingText,
}: RecordStateProps) => {
  return (
    <Stack spacing={2.5} className={className}>
      <BackButton placement='edge' onClick={onBack}>
        {backLabel}
      </BackButton>
      {missing ? (
        <Paper variant='outlined' className={s.empty}>
          <Typography color='text.secondary'>{missingText}</Typography>
        </Paper>
      ) : (
        <Box className={s.loader}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  )
}
