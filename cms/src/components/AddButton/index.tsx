import './styles.scss'

interface IAddButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const AddButton: React.FC<IAddButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  console.log(className)
  return (
    <button
      className={'add-item-button fill-width ' + className}
      onClick={onClick}
    >
      &#10010; {children}
    </button>
  )
}

export default AddButton
