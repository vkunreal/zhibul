import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'

import { ItemActionsProps } from './interfaces'

import s from './styles.module.scss'

export const ItemActions = ({
  siteHref,
  onConfigure,
  onEdit,
  onCopy,
  onDelete,
}: ItemActionsProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const open = Boolean(anchor)

  const close = () => setAnchor(null)

  const run = (action: () => void) => {
    close()
    action()
  }

  return (
    <>
      <Tooltip title='Действия'>
        <IconButton
          size='small'
          aria-label='Действия'
          aria-haspopup='true'
          aria-expanded={open || undefined}
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          <MoreVertIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: { className: s.paper },
          list: { className: s.list },
        }}
      >
        <MenuItem className={s.item} onClick={() => run(onEdit)}>
          <ListItemIcon className={s.icon}>
            <EditOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary='Изменить'
            slotProps={{ primary: { className: s.label } }}
          />
        </MenuItem>
        <MenuItem className={s.item} onClick={() => run(onCopy)}>
          <ListItemIcon className={s.icon}>
            <ContentCopyOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary='Копировать'
            slotProps={{ primary: { className: s.label } }}
          />
        </MenuItem>
        <MenuItem className={s.item} onClick={() => run(onConfigure)}>
          <ListItemIcon className={s.icon}>
            <TuneOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary='Настроить'
            slotProps={{ primary: { className: s.label } }}
          />
        </MenuItem>
        <MenuItem
          className={s.item}
          component='a'
          href={siteHref}
          target='_blank'
          rel='noopener noreferrer'
          onClick={close}
        >
          <ListItemIcon className={s.icon}>
            <OpenInNewOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary='Открыть на сайте'
            slotProps={{ primary: { className: s.label } }}
          />
        </MenuItem>
        <Divider className={s.divider} />
        <MenuItem
          className={[s.item, s.danger].join(' ')}
          onClick={() => run(onDelete)}
        >
          <ListItemIcon className={s.icon}>
            <DeleteOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary='Удалить'
            slotProps={{ primary: { className: s.label } }}
          />
        </MenuItem>
      </Menu>
    </>
  )
}
