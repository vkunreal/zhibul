import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { Chip, IconButton, Tooltip, Typography } from '@mui/material'

import { PreviewImage } from '@shared/ui'

import { ConfigureImageProps } from './interfaces'

export const ConfigureImage = ({
  src,
  pending = false,
  editable,
  isMain = false,
  onRemove,
  onMakeMain,
}: ConfigureImageProps) => {
  return (
    <PreviewImage
      src={src}
      pending={pending}
      onRemove={editable ? onRemove : undefined}
    >
      {isMain ? (
        <Chip
          size='small'
          color='primary'
          icon={<StarOutlinedIcon />}
          label='Главная'
        />
      ) : editable && onMakeMain ? (
        <Tooltip title='Сделать главной'>
          <IconButton size='small' onClick={onMakeMain}>
            <StarOutlineOutlinedIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      ) : (
        <Typography variant='caption' color='text.disabled'>
          —
        </Typography>
      )}
    </PreviewImage>
  )
}
