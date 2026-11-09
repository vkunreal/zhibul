import { Box } from '@mui/material'

import { Loader } from '@/shared/ui'

export default function CategoryLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Loader />
    </Box>
  )
}
