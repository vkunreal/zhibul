import AddIcon from '@mui/icons-material/Add'
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import { countriesRequested } from '@entities/countries'
import {
  $categories,
  copyItemFx,
  deleteItemFx,
  getCategoriesFx,
} from '@entities/items'
import { CategoryOption, Item } from '@entities/items/model'
import { ItemsTable } from '@entities/items/ui/ItemsTable'
import { $valutes, valutesRequested } from '@entities/valutes'
import { ItemFormValues } from '@features/save-item/interfaces'
import {
  changeItemSubmitted,
  createItemSubmitted,
} from '@features/save-item/model'
import { Confirm } from '@shared/ui'

import { ItemsViewProps } from './interfaces'
import { ItemsFilters } from './ui/ItemsFilters'

import s from './styles.module.scss'

export const ItemsView: React.FC<ItemsViewProps> = ({
  items,
  categoryUrl,
  search,
  loading,
  onCategoryChange,
  onSearchChange,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deletedItem, setDeletedItem] = useState<Item | null>(null)
  const [copyDialog, setCopyDialog] = useState(false)
  const [copiedItem, setCopiedItem] = useState<Item | null>(null)
  const { open } = useModal()

  const [
    allCategoriesDB,
    loadCategories,
    loadCountries,
    removeItem,
    copyItem,
    valutes,
    loadValutes,
    createItem,
    changeItem,
  ] = useUnit([
    $categories,
    getCategoriesFx,
    countriesRequested,
    deleteItemFx,
    copyItemFx,
    $valutes,
    valutesRequested,
    createItemSubmitted,
    changeItemSubmitted,
  ])

  useEffect(() => {
    loadCategories()
    loadCountries()
    loadValutes()
  }, [loadCategories, loadCountries, loadValutes])

  // Товары лежат только в конечных категориях — у разделов is_contains = 1.
  const categories = useMemo<CategoryOption[]>(
    () =>
      allCategoriesDB
        .filter((category) => !category.hasSubcategories)
        .map(({ id, name, url }) => ({ id, name, url }))
        .sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    [allCategoriesDB],
  )

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    onCategoryChange(event.target.value)
  }

  const setDeleteItem = (item: Item) => {
    setDeletedItem(item)
    setDeleteDialog(true)
  }

  const openItemModal = (item: Item | null) => {
    const onSubmit = (values: ItemFormValues) => {
      if (item) changeItem({ values, item })
      else createItem(values)
    }

    open('itemModal', { item, categories, valutes, onSubmit })
  }

  const askCopyItem = (item: Item) => {
    setCopiedItem(item)
    setCopyDialog(true)
  }

  const copyAndOpen = () => {
    if (!copiedItem) return

    const tab = window.open('about:blank', '_blank')
    setCopyDialog(false)

    void copyItem(copiedItem.id)
      .then((copied) => {
        const link = `${window.location.origin}/configure/${copied.id}`
        if (tab) tab.location.replace(link)
      })
      .catch(() => {
        tab?.close()
      })
  }

  const deleteItem = (id: number) => {
    removeItem(id)
    setDeleteDialog(false)
  }

  // Пока категории не загрузились, url из адреса не совпадёт ни с одним пунктом.
  const categoryFilterValue = categories.some(({ url }) => url === categoryUrl)
    ? categoryUrl
    : ''

  return (
    <Stack spacing={2}>
      <Box className={s.toolbar}>
        <ItemsFilters
          search={search}
          categoryUrl={categoryFilterValue}
          categories={categories}
          onSearchChange={onSearchChange}
          onCategoryChange={handleCategoryFilterChange}
        />

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => openItemModal(null)}
        >
          Добавить
        </Button>
      </Box>

      <ItemsTable
        items={items}
        loading={loading}
        setDeleteItem={setDeleteItem}
        setChangeItem={openItemModal}
        setCopyItem={askCopyItem}
      />

      <Confirm
        isOpen={copyDialog}
        onClose={() => setCopyDialog(false)}
        title='Вы точно хотите скопировать этот товар?'
      >
        <Button variant='outlined' color='success' onClick={copyAndOpen}>
          Скопировать
        </Button>
      </Confirm>

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title={`Вы уверены, что хотите удалить товар ${deletedItem?.name || ''}?`}
      >
        <Button
          variant='outlined'
          color='success'
          onClick={() => deleteItem(deletedItem?.id || 0)}
        >
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
