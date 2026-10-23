import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'

import { categorySortModeLabels } from '@entities/items'
import { CategorySortMode } from '@entities/items/model'

import { CategoryRowProps } from './interfaces'

import s from './styles.module.scss'

export const CategoryRow = ({
  category,
  depth,
  open,
  hasChildren,
  onToggle,
  onActiveChange,
  siteUrl,
  onAdd,
  onEdit,
  onDelete,
}: CategoryRowProps) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Box className={s.actions}>
          <Tooltip title={category.isActive ? 'Активна' : 'Скрыта'}>
            <Switch
              size='small'
              checked={category.isActive}
              onChange={(event) => onActiveChange(event.target.checked)}
              slotProps={{
                input: { 'aria-label': 'Активность категории' },
              }}
            />
          </Tooltip>
          <Tooltip title='Открыть на сайте'>
            <IconButton
              size='small'
              component='a'
              href={siteUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <OpenInNewOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Добавить подкатегорию'>
            <IconButton size='small' onClick={onAdd}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Изменить'>
            <IconButton size='small' onClick={onEdit}>
              <EditOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Удалить'>
            <IconButton size='small' color='error' onClick={onDelete}>
              <DeleteOutlinedIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      }
      className={[s.row, s[`depth${depth}`]].filter(Boolean).join(' ')}
    >
      <ListItemButton
        onClick={() => hasChildren && onToggle()}
        dense
        className={s.button}
      >
        <ListItemIcon className={s.expand}>
          {hasChildren ? (
            open ? (
              <ExpandLessIcon color='action' />
            ) : (
              <ExpandMoreIcon color='action' />
            )
          ) : (
            <Box className={s.spacer} />
          )}
        </ListItemIcon>

        <ListItemText
          primary={
            <Box className={s.nameRow}>
              <Typography variant='body1' className={s.name}>
                {category.name}
              </Typography>
              <Chip
                size='small'
                variant='outlined'
                label={`${category.itemsCount} тов.`}
                className={s.chip}
              />
              {!hasChildren && category.sortMode !== CategorySortMode.Manual ? (
                <Chip
                  size='small'
                  variant='outlined'
                  color='primary'
                  label={categorySortModeLabels[category.sortMode]}
                  className={s.chip}
                />
              ) : null}
              {!category.isActive ? (
                <Chip
                  size='small'
                  label='скрыта'
                  color='default'
                  className={s.chip}
                />
              ) : null}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
