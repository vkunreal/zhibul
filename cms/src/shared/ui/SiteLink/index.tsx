import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { Button } from '@mui/material'

import { SiteLinkProps } from './interfaces'

export const SiteLink = ({ href }: SiteLinkProps) => {
  return (
    <Button
      variant='outlined'
      startIcon={<OpenInNewOutlinedIcon />}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      Открыть на сайте
    </Button>
  )
}
