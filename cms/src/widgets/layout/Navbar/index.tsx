import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router'

import { sessionCleared } from '@shared/auth'

import { navRoutes } from './constants'
import { useNavbarCollapsed } from './hook'

import s from './styles.module.scss'

const isRouteActive = (pathname: string, url: string) =>
  pathname === url || pathname.startsWith(`${url}/`)

export const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const { collapsed, toggle } = useNavbarCollapsed()
  const toggleLabel = collapsed ? 'Развернуть меню' : 'Свернуть меню'

  return (
    <Paper
      elevation={0}
      square
      className={collapsed ? `${s.sidebar} ${s.collapsed}` : s.sidebar}
    >
      <Box className={s.brand}>
        <Box className={s.brandText}>
          <Typography variant='h6' className={s.title}>
            CMS
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Управление сайтом
          </Typography>
        </Box>
        <Tooltip title={toggleLabel} placement='right'>
          <IconButton
            size='small'
            aria-label={toggleLabel}
            onClick={toggle}
            className={s.toggle}
          >
            {collapsed ? (
              <KeyboardDoubleArrowRightOutlinedIcon fontSize='small' />
            ) : (
              <KeyboardDoubleArrowLeftOutlinedIcon fontSize='small' />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <List className={s.nav} disablePadding>
        {navRoutes.map(({ name, url, Icon }) => {
          const active = isRouteActive(pathname, url)

          return (
            <Tooltip
              key={url}
              title={name}
              placement='right'
              disableHoverListener={!collapsed}
              disableFocusListener={!collapsed}
            >
              <ListItemButton
                component={NavLink}
                to={url}
                selected={active}
                aria-label={name}
                className={s.link}
              >
                <ListItemIcon className={s.icon}>
                  <Icon fontSize='small' />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  className={s.label}
                  slotProps={{
                    primary: {
                      variant: 'body2',
                      className: active ? s.linkTextActive : s.linkText,
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          )
        })}
      </List>

      <Box className={s.footer}>
        <Divider className={s.footerDivider} />
        <Tooltip
          title='Очистить кэш'
          placement='right'
          disableHoverListener={!collapsed}
          disableFocusListener={!collapsed}
        >
          <Button
            fullWidth
            size='small'
            color='inherit'
            variant='outlined'
            aria-label='Очистить кэш'
            startIcon={<DeleteSweepOutlinedIcon />}
            onClick={() => sessionCleared()}
            className={s.clearButton}
          >
            <span className={s.clearLabel}>Очистить кэш</span>
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  )
}
