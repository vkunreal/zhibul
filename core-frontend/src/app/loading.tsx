import { Box } from '@mui/material'

import { Loader } from '@/shared/ui'

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Loader />
    </Box>
  )
}
