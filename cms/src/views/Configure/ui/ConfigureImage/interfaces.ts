export interface ConfigureImageProps {
  src: string
  pending?: boolean
  editable: boolean
  isMain?: boolean
  onRemove: () => void
  onMakeMain?: () => void
}
