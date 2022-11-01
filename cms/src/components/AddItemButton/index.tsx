import './styles.scss'

interface IAdditemButtonProps {
  className?: string
  onClick?: () => void
}

export const AddItemButton: React.FC<IAdditemButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={'add-item-button fill-width ' + className}
      onClick={onClick}
    >
      &#10010; Добавить товар
    </button>
  )
}
