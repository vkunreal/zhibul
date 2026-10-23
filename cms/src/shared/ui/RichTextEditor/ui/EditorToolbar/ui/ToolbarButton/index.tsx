import { IconButton, Tooltip } from '@mui/material'

import { ToolbarButtonProps } from './interfaces'

export const ToolbarButton = ({
  title,
  disabled,
  active,
  onClick,
  icon,
}: ToolbarButtonProps) => {
  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          size='small'
          disabled={disabled}
          color={active ? 'primary' : 'default'}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}
