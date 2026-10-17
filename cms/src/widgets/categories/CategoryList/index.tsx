import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import React, { useEffect, useState } from 'react'

import { $categories, deleteCategoryFx, getCategoriesFx } from '@entities/items'
import { Category } from '@entities/items/model'
import { CategoryMenu } from '@features/save-category'
import { Confirm } from '@shared/ui'

import { CategoryDetails } from '../CategoryDetails'

export const CategoryList: React.FC = () => {
  const [categories, loadCategories, removeCategory] = useUnit([
    $categories,
    getCategoriesFx,
    deleteCategoryFx,
  ])

  const [deletedCategory, setDeletedCategory] = useState<Category | null>(null)
  const [changedCategory, setChangedCategory] = useState<Category | null>(null)
  const [parentId, setParentId] = useState<number | null>(null)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)

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

  const setChangeCategory = (category: Category) => {
    setChangedCategory(category)
    setChangeDialog(true)
  }

  const setDeleteCategory = (category: Category) => {
    setDeletedCategory(category)
    setDeleteDialog(true)
  }

  const handleSetParentId = (id: number) => {
    setParentId(id)
    setAddDialog(true)
  }

  return (
    <Stack spacing={2}>
      <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2,
            py: 1.5,
          }}
        >
          <Box>
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              Дерево категорий
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Раскрывайте ветки, управляйте видимостью и вложенностью
            </Typography>
          </Box>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => {
              setParentId(null)
              setAddDialog(true)
            }}
          >
            Добавить
          </Button>
        </Box>

        <Divider />

        {rootCategories.length === 0 ? (
          <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
            <Typography color='text.secondary'>
              Пока нет категорий — создайте первую
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {rootCategories.map((category, index) => (
              <React.Fragment key={category.id}>
                {index > 0 ? <Divider component='li' /> : null}
                <CategoryDetails
                  categories={categories}
                  category={category}
                  getCategories={getCategories}
                  setParentId={handleSetParentId}
                  setDeletedCategory={setDeleteCategory}
                  setChangedCategory={setChangeCategory}
                />
              </React.Fragment>
            ))}
          </List>
        )}
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

      {changedCategory && (
        <CategoryMenu
          isOpen={changeDialog}
          onClose={() => setChangeDialog(false)}
          category={changedCategory}
        />
      )}

      <CategoryMenu
        isOpen={addDialog}
        parentId={parentId}
        onClose={() => setAddDialog(false)}
      />
    </Stack>
  )
}
