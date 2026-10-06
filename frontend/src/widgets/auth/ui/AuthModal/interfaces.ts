export interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export enum Step {
  phone = 'phone',
  code = 'code',
}

export interface IssuedCode {
  ttl: number
  length: number
}
