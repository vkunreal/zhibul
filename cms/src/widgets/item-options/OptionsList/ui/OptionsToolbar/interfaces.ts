export interface OptionsToolbarProps {
  onAdd: () => void
  canDeleteAll: boolean
  onDeleteAll: () => void
  orderChanged: boolean
  onSave: () => void
  onCancel: () => void
}
