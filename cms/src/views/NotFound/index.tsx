import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

export const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        variant='outlined'
        sx={{
          width: '100%',
          maxWidth: 480,
          px: 4,
          py: 5,
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h2'
          sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}
        >
          404
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: 600, mt: 1 }}>
          Страница не найдена
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1.5 }}>
          Такого адреса в админке нет. Проверьте ссылку или вернитесь на
          главную.
        </Typography>

        <Stack
          direction='row'
          spacing={1.5}
          sx={{ justifyContent: 'center', mt: 3 }}
        >
          <Button
            variant='contained'
            component={RouterLink}
            to='/home'
            startIcon={<HomeOutlinedIcon />}
          >
            На главную
          </Button>
          <Button variant='outlined' component={RouterLink} to='/items'>
            К товарам
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
