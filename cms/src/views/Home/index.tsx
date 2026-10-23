import { Box, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import { PageHeader } from '@shared/ui'
import { routes } from '@widgets/layout/Navbar/constants'

import s from './styles.module.scss'

export const Home: React.FC = () => {
  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Главная'
        subtitle='Выберите раздел для работы с контентом сайта'
      />

      <Box className={s.grid}>
        {routes.map(({ name, url, description, Icon }) => (
          <Paper
            key={url}
            component={RouterLink}
            to={url}
            variant='outlined'
            className={s.card}
          >
            <Box className={s.icon}>
              <Icon />
            </Box>

            <Box className={s.cardBody}>
              <Typography variant='h6' className={s.cardTitle}>
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
