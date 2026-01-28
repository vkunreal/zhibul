import { Box, CircularProgress } from '@mui/material'

export default function DashboardLoading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <CircularProgress
        sx={{
          color: '#333',
        }}
      />
    </Box>
  )
}
