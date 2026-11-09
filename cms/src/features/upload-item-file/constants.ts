import type { SvgIconComponent } from '@mui/icons-material'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'

import { FileFormValues } from './interfaces'

export const emptyFileForm: FileFormValues = {
  title: '',
  icon: '',
}

export const icons: {
  id: number
  value: string
  title: string
  Icon: SvgIconComponent
}[] = [
  { id: 1, value: 'options', title: 'Настройки', Icon: SettingsOutlinedIcon },
  { id: 2, value: 'book', title: 'Книга', Icon: BookOutlinedIcon },
  {
    id: 3,
    value: 'warning',
    title: 'Внимание',
    Icon: WarningAmberOutlinedIcon,
  },
]

export const getFileIcon = (icon: string): SvgIconComponent | null =>
  icons.find(({ value }) => value === icon)?.Icon ?? null
