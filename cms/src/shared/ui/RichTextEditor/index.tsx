import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import RedoIcon from '@mui/icons-material/Redo'
import UndoIcon from '@mui/icons-material/Undo'
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import { RichTextEditorProps } from './interfaces'

import './styles.scss'

type BlockType = 'paragraph' | 'h2' | 'h3' | 'h4'

const isEmptyHtml = (html: string) => {
  if (/<hr\b/i.test(html)) return false

  const text = html
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim()

  return !text
}

const getBlockType = (editor: NonNullable<ReturnType<typeof useEditor>>): BlockType => {
  if (editor.isActive('heading', { level: 2 })) return 'h2'
  if (editor.isActive('heading', { level: 3 })) return 'h3'
  if (editor.isActive('heading', { level: 4 })) return 'h4'
  return 'paragraph'
}

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

  const blockType = getBlockType(editor)

  const handleBlockTypeChange = (event: SelectChangeEvent<BlockType>) => {
    const next = event.target.value as BlockType
    const chain = editor.chain().focus()

    if (next === 'paragraph') {
      chain.setParagraph().run()
      return
    }

    const level = Number(next.slice(1)) as 2 | 3 | 4
    chain.toggleHeading({ level }).run()
  }

  return (
    <Box>
      {label ? (
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: 'block', mb: 0.75, letterSpacing: 0.2 }}
        >
          {label}
        </Typography>
      ) : null}

      <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 0.25,
            px: 0.75,
            py: 0.5,
            bgcolor: 'grey.50',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <FormControl size='small' sx={{ minWidth: 120, mr: 0.5 }}>
            <Select
              value={blockType}
              disabled={disabled}
              onChange={handleBlockTypeChange}
              displayEmpty
              sx={{
                height: 32,
                fontSize: 13,
                bgcolor: 'background.paper',
                '& .MuiSelect-select': { py: 0.5 },
              }}
            >
              <MenuItem value='paragraph'>Текст</MenuItem>
              <MenuItem value='h2'>Заголовок 2</MenuItem>
              <MenuItem value='h3'>Заголовок 3</MenuItem>
              <MenuItem value='h4'>Заголовок 4</MenuItem>
            </Select>
          </FormControl>

          <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

          <Tooltip title='Жирный'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                color={editor.isActive('bold') ? 'primary' : 'default'}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <FormatBoldIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title='Курсив'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                color={editor.isActive('italic') ? 'primary' : 'default'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <FormatItalicIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>

          <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

          <Tooltip title='Маркированный список'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                color={editor.isActive('bulletList') ? 'primary' : 'default'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <FormatListBulletedIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title='Нумерованный список'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                color={editor.isActive('orderedList') ? 'primary' : 'default'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <FormatListNumberedIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>

          <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

          <Tooltip title='Цитата'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                color={editor.isActive('blockquote') ? 'primary' : 'default'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <FormatQuoteIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title='Горизонтальная линия'>
            <span>
              <IconButton
                size='small'
                disabled={disabled}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <HorizontalRuleIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>

          <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

          <Tooltip title='Отменить'>
            <span>
              <IconButton
                size='small'
                disabled={disabled || !editor.can().undo()}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <UndoIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title='Повторить'>
            <span>
              <IconButton
                size='small'
                disabled={disabled || !editor.can().redo()}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <RedoIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Box className='rich-text-editor__content'>
          <EditorContent editor={editor} />
        </Box>
      </Paper>
    </Box>
  )
}
