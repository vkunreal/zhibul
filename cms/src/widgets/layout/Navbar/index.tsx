import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router'

import { navRoutes } from './constants'

const isRouteActive = (pathname: string, url: string) =>
  pathname === url || pathname.startsWith(`${url}/`)

export const Navbar: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <Paper
      elevation={0}
      square
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.50',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, letterSpacing: 0.2, lineHeight: 1.2 }}
        >
          CMS
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          Управление сайтом
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1.25, py: 1.5 }} disablePadding>
        {navRoutes.map(({ name, url, Icon }) => {
          const active = isRouteActive(pathname, url)

          return (
            <ListItemButton
              key={url}
              component={NavLink}
              to={url}
              selected={active}
              sx={{
                mb: 0.5,
                borderRadius: 1.5,
                py: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <Icon fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary={name}
                slotProps={{
                  primary: {
                    variant: 'body2',
                    sx: { fontWeight: active ? 600 : 500 },
                  },
                }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Box sx={{ px: 1.5, pb: 2, pt: 1 }}>
        <Divider sx={{ mb: 1.5 }} />
        <Button
          fullWidth
          size='small'
          color='inherit'
          variant='outlined'
          startIcon={<DeleteSweepOutlinedIcon />}
          onClick={() => localStorage.clear()}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            borderColor: 'divider',
            textTransform: 'none',
          }}
        >
          Очистить кэш
        </Button>
      </Box>
    </Paper>
  )
}
