import { Box, Typography } from '@mui/material'

import { PageHeaderProps } from './interfaces'

import s from './styles.module.scss'

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <Box className={actions ? s.row : undefined}>
      <Box>
        <Typography variant='h4' component='h1' className={s.title}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant='body2'
            color='text.secondary'
            className={s.subtitle}
          >
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {actions}
    </Box>
  )
}
