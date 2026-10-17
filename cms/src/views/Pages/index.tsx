import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { $pages, deletePageFx, getPagesFx } from '@entities/pages'
import { Page } from '@entities/pages/model'
import { AddPageMenu } from '@features/save-page'
import { Confirm } from '@shared/ui'

const Field = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <Box>
    <Typography
      variant='caption'
      color='text.secondary'
      sx={{ display: 'block', mb: 0.5, letterSpacing: 0.2 }}
    >
      {label}
    </Typography>
    <Typography
      variant='body2'
      sx={{
        color: value ? 'text.primary' : 'text.disabled',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        lineHeight: 1.55,
      }}
    >
      {value || '—'}
    </Typography>
  </Box>
)

export const Pages: React.FC = () => {
  const [addMenu, setAddMenu] = useState(false)
  const [changeMenu, setChangeMenu] = useState(false)
  const [changedPage, setChangedPage] = useState<Page | null>(null)
  const [deletedPage, setDeletedPage] = useState<Page | null>(null)

  const [pages, loadPages, removePage] = useUnit([
    $pages,
    getPagesFx,
    deletePageFx,
  ])

  useEffect(() => {
    loadPages()
  }, [loadPages])

  const openChangePage = (page: Page) => {
    setChangedPage(page)
    setChangeMenu(true)
  }

  const confirmDelete = () => {
    if (!deletedPage) return
    removePage(deletedPage.url)
    setDeletedPage(null)
  }

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
            Страницы
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Статический контент и SEO-данные для страниц сайта
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setAddMenu(true)}
        >
          Добавить
        </Button>
      </Box>

      {pages.length === 0 ? (
        <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
          <Typography color='text.secondary'>
            Пока нет страниц — создайте первую
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {pages.map((page) => (
            <Paper key={page.url} variant='outlined' sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  bgcolor: 'grey.50',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant='body2'
                  color='primary'
                  sx={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                >
                  /{page.url}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.25, flexShrink: 0 }}>
                  <Tooltip title='Изменить'>
                    <IconButton
                      size='small'
                      onClick={() => openChangePage(page)}
                    >
                      <EditOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Удалить'>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => setDeletedPage(page)}
                    >
                      <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Stack spacing={2} sx={{ p: 2.5 }} divider={<Divider />}>
                <Field label='Название' value={page.name} />
                <Field label='Текст' value={page.text} />
                <Stack spacing={1.5}>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 600, letterSpacing: 0.2 }}
                  >
                    SEO
                  </Typography>
                  <Field label='Title' value={page.seoTitle} />
                  <Field label='Description' value={page.seoDescription} />
                  <Field label='Keywords' value={page.seoKeywords} />
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <AddPageMenu
        title='Добавление страницы'
        isOpen={addMenu}
        onClose={() => setAddMenu(false)}
      />

      <AddPageMenu
        title='Изменение страницы'
        isOpen={changeMenu}
        page={changedPage}
        onClose={() => setChangeMenu(false)}
        change
      />

      <Confirm
        isOpen={deletedPage !== null}
        onClose={() => setDeletedPage(null)}
        title={`Удалить страницу «${deletedPage?.name || deletedPage?.url || ''}»?`}
      >
        <Button variant='outlined' color='success' onClick={confirmDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
