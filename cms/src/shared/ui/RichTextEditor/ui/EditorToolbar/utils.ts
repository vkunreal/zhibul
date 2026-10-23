import { Editor } from '@tiptap/react'

export type BlockType = 'paragraph' | 'h2' | 'h3' | 'h4'

export const getBlockType = (editor: Editor): BlockType => {
  if (editor.isActive('heading', { level: 2 })) return 'h2'
  if (editor.isActive('heading', { level: 3 })) return 'h3'
  if (editor.isActive('heading', { level: 4 })) return 'h4'
  return 'paragraph'
}
