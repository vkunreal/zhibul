import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { CategoryList } from '@widgets/categories/CategoryList'

export const Categories: React.FC = () => {
  return (
    <Stack spacing={2} sx={{ p: 3, maxWidth: 960 }}>
      <Box>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
          Категории
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Структура каталога и видимость разделов
        </Typography>
      </Box>

      <CategoryList />
    </Stack>
  )
}
