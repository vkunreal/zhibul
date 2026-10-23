import { Valute } from '@entities/valutes/model'

export interface ValuteMenuProps {
  valute: Valute
  onSubmit: (value: string) => void
  isOpen: boolean
  onClose: () => void
}
