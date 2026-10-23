import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { Button } from '@mui/material'

import { BackButtonProps } from './interfaces'

import s from './styles.module.scss'

export const BackButton = ({
  children,
  onClick,
  placement = 'block',
}: BackButtonProps) => {
  return (
    <Button
      size='small'
      startIcon={<ArrowBackOutlinedIcon />}
      onClick={onClick}
      className={[s.root, placement === 'edge' ? s.edge : s.block].join(' ')}
    >
      {children}
    </Button>
  )
}
