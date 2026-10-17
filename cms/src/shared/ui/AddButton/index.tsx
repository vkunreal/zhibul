import { AddButtonProps } from './interfaces'

import './styles.scss'

export const AddButton: React.FC<AddButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={'add-item-button fill-width ' + className}
      onClick={onClick}
    >
      &#10010; {children}
    </button>
  )
}
