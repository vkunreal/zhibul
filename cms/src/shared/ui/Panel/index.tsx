import { Box, Paper, Typography } from '@mui/material'

import { PanelProps } from './interfaces'

import s from './styles.module.scss'

export const Panel = ({
  title,
  actions,
  children,
  align = 'center',
  padded = true,
}: PanelProps) => {
  return (
    <Paper variant='outlined' className={s.root}>
      <Box
        className={[s.head, align === 'start' && s.headStart]
          .filter(Boolean)
          .join(' ')}
      >
        <Box className={s.main}>
          {typeof title === 'string' ? (
            <Typography variant='subtitle1' className={s.title}>
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
        {actions ? <Box className={s.actions}>{actions}</Box> : null}
      </Box>
      {children ? (
        <Box className={padded ? s.body : undefined}>{children}</Box>
      ) : null}
    </Paper>
  )
}
