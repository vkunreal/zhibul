import { AddButtonProps } from './interfaces'

import s from './styles.module.scss'

export const AddButton: React.FC<AddButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={[s.root, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      &#10010; {children}
    </button>
  )
}
