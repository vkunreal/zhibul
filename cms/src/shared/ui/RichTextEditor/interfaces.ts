export interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  label?: string
  disabled?: boolean
}
