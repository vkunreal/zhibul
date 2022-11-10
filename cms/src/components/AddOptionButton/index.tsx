import './styles.scss'

interface IAddOptionButtonProps {
  className?: string
  onClick?: () => void
}

export const AddOptionButton: React.FC<IAddOptionButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={'add-option-button fill-width ' + className}
      onClick={onClick}
    >
      &#10010; Добавить опцию
    </button>
  )
}
