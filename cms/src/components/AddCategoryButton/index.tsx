import './styles.scss'

interface IAddCategoryButtonProps {
  className?: string
  onClick: () => void
}

export const AddCategoryButton: React.FC<IAddCategoryButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={'add-category-button fill-width ' + className}
      onClick={onClick}
    >
      &#10010; Добавить категорию
    </button>
  )
}
