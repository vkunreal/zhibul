import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import s from './styles.module.scss'

export const NotFound: React.FC = () => {
  return (
    <Box className={s.page}>
      <Paper variant='outlined' className={s.card}>
        <Typography variant='h2' className={s.code}>
          404
        </Typography>
        <Typography variant='h5' className={s.title}>
          Страница не найдена
        </Typography>
        <Typography variant='body2' color='text.secondary' className={s.text}>
          Такого адреса в админке нет. Проверьте ссылку или вернитесь на
          главную.
        </Typography>

        <Stack direction='row' spacing={1.5} className={s.actions}>
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
