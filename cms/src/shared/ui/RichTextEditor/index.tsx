import { Box, Paper, Typography } from '@mui/material'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import { RichTextEditorProps } from './interfaces'
import { EditorToolbar } from './ui/EditorToolbar'
import { isEmptyHtml } from './utils'

import s from './styles.module.scss'

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
    ],
    content: value || '',
    editable: !disabled,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor: current }) => {
      const html = current.getHTML()
      onChange(isEmptyHtml(html) ? '' : html)
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const next = value || ''
    if (current === next) return
    if (isEmptyHtml(current) && isEmptyHtml(next)) return
    editor.commands.setContent(next, { emitUpdate: false })
  }, [editor, value])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(!disabled)
  }, [editor, disabled])

  if (!editor) return null

  return (
    <Box>
      {label ? (
        <Typography
          variant='caption'
          color='text.secondary'
          className={s.label}
        >
          {label}
        </Typography>
      ) : null}

      <Paper variant='outlined' className={s.editor}>
        <EditorToolbar editor={editor} disabled={disabled} />

        <Box className={s.content}>
          <EditorContent editor={editor} />
        </Box>
      </Paper>
    </Box>
  )
}
