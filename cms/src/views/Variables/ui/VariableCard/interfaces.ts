import { Variable } from '@entities/variables/model'

export interface VariableCardProps {
  variable: Variable
  label: string
  onEdit: () => void
  onDelete: () => void
}
