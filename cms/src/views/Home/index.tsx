import { Box, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import { routes } from '@widgets/layout/Navbar/constants'

export const Home: React.FC = () => {
  return (
    <Stack spacing={2.5} sx={{ p: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
          Главная
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Выберите раздел для работы с контентом сайта
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {routes.map(({ name, url, description, Icon }) => (
          <Paper
            key={url}
            component={RouterLink}
            to={url}
            variant='outlined'
            sx={{
              p: 3,
              minHeight: 168,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              transition:
                'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                transform: 'translateY(-2px)',
                '& .home-section-icon': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <Box
              className='home-section-icon'
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                bgcolor: 'grey.100',
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
            >
              <Icon />
            </Box>

            <Box sx={{ mt: 'auto' }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                {name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Stack>
  )
}
