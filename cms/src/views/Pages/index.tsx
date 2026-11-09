import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import { $pages, deletePageFx, getPagesFx } from '@entities/pages'
import { Page } from '@entities/pages/model'
import {
  changePageSubmitted,
  createPageSubmitted,
} from '@features/save-page/model'
import { Confirm, FetchState, PageHeader } from '@shared/ui'

import { PageCard } from './ui/PageCard'

import s from './styles.module.scss'

export const Pages: React.FC = () => {
  const [deletedPage, setDeletedPage] = useState<Page | null>(null)
  const { open } = useModal()

  const [pages, loading, loadPages, removePage, createPage, changePage] =
    useUnit([
      $pages,
      getPagesFx.pending,
      getPagesFx,
      deletePageFx,
      createPageSubmitted,
      changePageSubmitted,
    ])

  useEffect(() => {
    loadPages()
  }, [loadPages])

  const openPageModal = (page: Page | null) => {
    open('pageModal', {
      page,
      onSubmit: page ? changePage : createPage,
    })
  }

  const confirmDelete = () => {
    if (!deletedPage) return
    removePage(deletedPage.url)
    setDeletedPage(null)
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Страницы'
        subtitle='Статический контент и SEO-данные для страниц сайта'
        actions={
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => openPageModal(null)}
          >
            Добавить
          </Button>
        }
      />

      <FetchState
        loading={loading}
        empty={pages.length === 0}
        emptyText='Пока нет страниц — создайте первую'
      >
        <Stack spacing={2}>
          {pages.map((page) => (
            <PageCard
              key={page.url}
              page={page}
              onEdit={() => openPageModal(page)}
              onDelete={() => setDeletedPage(page)}
            />
          ))}
        </Stack>
      </FetchState>

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
