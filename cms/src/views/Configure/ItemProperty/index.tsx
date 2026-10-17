import { Box, Typography } from '@mui/material'

import { ItemPropertyProps } from './interfaces'

export const ItemProperty: React.FC<ItemPropertyProps> = ({
  label,
  children,
}) => {
  const empty =
    children == null ||
    children === '' ||
    (typeof children === 'string' && !children.trim())

  return (
    <Box>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ display: 'block', mb: 0.5, letterSpacing: 0.2 }}
      >
        {label}
      </Typography>
      <Typography
        variant='body2'
        component='div'
        sx={{
          color: empty ? 'text.disabled' : 'text.primary',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.55,
        }}
      >
        {empty ? '—' : children}
      </Typography>
    </Box>
  )
}
