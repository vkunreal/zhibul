import { TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { ItemStatusChips } from '@entities/items/ui/ItemStatusChips'
import { env } from '@shared/config'

import { ItemRowProps } from './interfaces'
import { ItemActions } from './ui/ItemActions'

import s from './styles.module.scss'

export const ItemRow = ({
  item,
  onConfigure,
  onEdit,
  onCopy,
  onDelete,
}: ItemRowProps) => {
  return (
    <TableRow hover className={s.row} onDoubleClick={onConfigure}>
      <TableCell align='right'>
        <Typography variant='body2' color='text.secondary'>
          {item.position}
        </Typography>
      </TableCell>

      <TableCell className={s.nameCell}>
        <Typography variant='body2' className={s.name}>
          {item.name || '—'}
        </Typography>
        {(item.code || item.url) && (
          <Typography
            variant='caption'
            color='text.secondary'
            className={s.code}
          >
            {[item.code, item.url ? `/${item.url}` : '']
              .filter(Boolean)
              .join(' · ')}
          </Typography>
        )}
      </TableCell>

      <TableCell className={s.brandCell}>
        <Typography
          variant='body2'
          noWrap
          className={item.brand ? s.brand : s.brandMuted}
        >
          {item.brand || '—'}
        </Typography>
      </TableCell>

      <TableCell>
        {item.categoryName ? (
          <Tooltip title={item.categoryName}>
            <Typography variant='body2' noWrap className={s.categoryName}>
              {item.categoryName}
            </Typography>
          </Tooltip>
        ) : (
          <Typography variant='body2' color='text.disabled'>
            —
          </Typography>
        )}
      </TableCell>

      <TableCell align='right'>
        <Typography variant='body2' className={s.price}>
          {item.displayPrice || '—'}
        </Typography>
      </TableCell>

      <TableCell>
        <ItemStatusChips
          isActive={item.isActive}
          isOrderOnly={item.isOrderOnly}
        />
      </TableCell>

      <TableCell
        align='right'
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <ItemActions
          siteHref={`${env.siteUrl}/menu/${item.categoryUrl}/${item.url}`}
          onConfigure={onConfigure}
          onEdit={onEdit}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  )
}
