import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import { $categories, deleteCategoryFx, getCategoriesFx } from '@entities/items'
import { Category } from '@entities/items/model'
import { CategoryFormValues } from '@features/save-category/interfaces'
import {
  changeCategorySubmitted,
  createCategorySubmitted,
} from '@features/save-category/model'
import { Confirm, FetchState } from '@shared/ui'

import { CategoryTree } from './ui/CategoryTree'

import s from './styles.module.scss'

export const CategoryList: React.FC = () => {
  const { open } = useModal()
  const [
    categories,
    loading,
    loadCategories,
    removeCategory,
    createCategory,
    changeCategory,
  ] = useUnit([
    $categories,
    getCategoriesFx.pending,
    getCategoriesFx,
    deleteCategoryFx,
    createCategorySubmitted,
    changeCategorySubmitted,
  ])

  const [deletedCategory, setDeletedCategory] = useState<Category | null>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const getCategories = (parentId: number | null) =>
    categories.filter((category) => category.parentId === parentId)

  const rootCategories = getCategories(null).sort((a, b) =>
    a.name.localeCompare(b.name, 'ru'),
  )

  const deleteCategory = () => {
    const id = deletedCategory?.id
    if (id == null) return

    removeCategory(id)
    setDeleteDialog(false)
  }

  const openCategoryModal = (
    category: Category | null,
    parentId: number | null,
  ) => {
    const onSubmit = ({
      values,
      image,
    }: {
      values: CategoryFormValues
      image: File | null
    }) => {
      if (category) changeCategory({ values, category })
      else createCategory({ values, parentId, image })
    }

    open('categoryModal', { category, onSubmit })
  }

  const setDeleteCategory = (category: Category) => {
    setDeletedCategory(category)
    setDeleteDialog(true)
  }

  const handleSetParentId = (id: number) => {
    openCategoryModal(null, id)
  }

  return (
    <Stack spacing={2}>
      <Paper variant='outlined' className={s.panel}>
        <Box className={s.header}>
          <Box>
            <Typography variant='subtitle1' className={s.title}>
              Дерево категорий
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Раскрывайте ветки, управляйте видимостью и вложенностью
            </Typography>
          </Box>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => openCategoryModal(null, null)}
          >
            Добавить
          </Button>
        </Box>

        <Divider />

        <FetchState
          loading={loading}
          empty={rootCategories.length === 0}
          emptyText='Пока нет категорий — создайте первую'
          framed={false}
        >
          <CategoryTree
            categories={categories}
            roots={rootCategories}
            getCategories={getCategories}
            onAddChild={handleSetParentId}
            onDelete={setDeleteCategory}
            onEdit={(category) => openCategoryModal(category, null)}
          />
        </FetchState>
      </Paper>

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title='Вы уверены, что хотите удалить категорию?'
      >
        <Button variant='outlined' color='success' onClick={deleteCategory}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
