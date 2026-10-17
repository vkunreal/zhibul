import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useState } from 'react'

import {
  categorySortModeLabels,
  setCategoryActiveFx,
} from '@entities/items'
import { CategorySortMode } from '@entities/items/model'
import { env } from '@shared/config'

import { CategoryDetailsProps } from './interfaces'

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  categories,
  category,
  depth = 0,
  getCategories,
  setDeletedCategory,
  setChangedCategory,
  setParentId,
}) => {
  const setActive = useUnit(setCategoryActiveFx)
  const subcategories = getCategories(category.id).sort((a, b) =>
    a.name.localeCompare(b.name, 'ru'),
  )
  const hasChildren = subcategories.length > 0

  const [open, setOpen] = useState(depth === 0)

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Box
            className='categories-tree__actions'
            sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}
          >
            <Tooltip title={category.isActive ? 'Активна' : 'Скрыта'}>
              <Switch
                size='small'
                checked={category.isActive}
                onChange={(event) =>
                  setActive({ id: category.id, active: event.target.checked })
                }
                slotProps={{
                  input: { 'aria-label': 'Активность категории' },
                }}
              />
            </Tooltip>
            <Tooltip title='Открыть на сайте'>
              <IconButton
                size='small'
                component='a'
                href={`${env.siteUrl}/menu/${category.url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <OpenInNewOutlinedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Добавить подкатегорию'>
              <IconButton size='small' onClick={() => setParentId(category.id)}>
                <AddIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Изменить'>
              <IconButton
                size='small'
                onClick={() => setChangedCategory(category)}
              >
                <EditOutlinedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Удалить'>
              <IconButton
                size='small'
                color='error'
                onClick={() => setDeletedCategory(category)}
              >
                <DeleteOutlinedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        }
        sx={{
          pl: depth * 2,
          '& .categories-tree__actions': {
            opacity: { xs: 1, md: 0.35 },
            transition: 'opacity 0.15s ease',
          },
          '&:hover .categories-tree__actions': {
            opacity: 1,
          },
        }}
      >
        <ListItemButton
          onClick={() => hasChildren && setOpen((value) => !value)}
          dense
          sx={{
            borderRadius: 1,
            pr: 22,
            py: 0.75,
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            {hasChildren ? (
              open ? (
                <ExpandLessIcon color='action' />
              ) : (
                <ExpandMoreIcon color='action' />
              )
            ) : (
              <Box sx={{ width: 24 }} />
            )}
          </ListItemIcon>

          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='body1' sx={{ fontWeight: 500 }}>
                  {category.name}
                </Typography>
                <Chip
                  size='small'
                  variant='outlined'
                  label={`${category.itemsCount} тов.`}
                  sx={{ height: 22, fontSize: 12 }}
                />
                {!hasChildren &&
                category.sortMode !== CategorySortMode.Manual ? (
                  <Chip
                    size='small'
                    variant='outlined'
                    color='primary'
                    label={categorySortModeLabels[category.sortMode]}
                    sx={{ height: 22, fontSize: 12 }}
                  />
                ) : null}
                {!category.isActive ? (
                  <Chip
                    size='small'
                    label='скрыта'
                    color='default'
                    sx={{ height: 22, fontSize: 12 }}
                  />
                ) : null}
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>

      {hasChildren ? (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List disablePadding>
            {subcategories.map((subcategory) => (
              <CategoryDetails
                key={subcategory.id}
                category={subcategory}
                categories={categories}
                depth={depth + 1}
                getCategories={getCategories}
                setDeletedCategory={setDeletedCategory}
                setChangedCategory={setChangedCategory}
                setParentId={setParentId}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  )
}
