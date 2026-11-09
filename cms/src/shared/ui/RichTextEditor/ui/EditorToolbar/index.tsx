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
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { EditorToolbarProps } from './interfaces'
import { ToolbarButton } from './ui/ToolbarButton'
import { BlockType, getBlockType } from './utils'

import s from './styles.module.scss'

export const EditorToolbar = ({ editor, disabled }: EditorToolbarProps) => {
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
    <Box className={s.toolbar}>
      <FormControl size='small' className={s.blockType}>
        <Select
          value={blockType}
          disabled={disabled}
          onChange={handleBlockTypeChange}
          displayEmpty
          className={s.blockSelect}
        >
          <MenuItem value='paragraph'>Текст</MenuItem>
          <MenuItem value='h2'>Заголовок 2</MenuItem>
          <MenuItem value='h3'>Заголовок 3</MenuItem>
          <MenuItem value='h4'>Заголовок 4</MenuItem>
        </Select>
      </FormControl>

      <Divider orientation='vertical' flexItem className={s.divider} />
      <ToolbarButton
        title='Жирный'
        disabled={disabled}
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={<FormatBoldIcon fontSize='small' />}
      />
      <ToolbarButton
        title='Курсив'
        disabled={disabled}
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={<FormatItalicIcon fontSize='small' />}
      />

      <Divider orientation='vertical' flexItem className={s.divider} />
      <ToolbarButton
        title='Маркированный список'
        disabled={disabled}
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<FormatListBulletedIcon fontSize='small' />}
      />
      <ToolbarButton
        title='Нумерованный список'
        disabled={disabled}
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<FormatListNumberedIcon fontSize='small' />}
      />

      <Divider orientation='vertical' flexItem className={s.divider} />
      <ToolbarButton
        title='Цитата'
        disabled={disabled}
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        icon={<FormatQuoteIcon fontSize='small' />}
      />
      <ToolbarButton
        title='Горизонтальная линия'
        disabled={disabled}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<HorizontalRuleIcon fontSize='small' />}
      />

      <Divider orientation='vertical' flexItem className={s.divider} />
      <ToolbarButton
        title='Отменить'
        disabled={disabled || !editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
        icon={<UndoIcon fontSize='small' />}
      />
      <ToolbarButton
        title='Повторить'
        disabled={disabled || !editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
        icon={<RedoIcon fontSize='small' />}
      />
    </Box>
  )
}
