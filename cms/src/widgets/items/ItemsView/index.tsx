import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'

import { countriesRequested } from '@entities/countries'
import { $categories, deleteItemFx, getCategoriesFx } from '@entities/items'
import { CategoryOption, Item } from '@entities/items/model'
import { ItemsTable } from '@entities/items/ui/ItemsTable'
import { $valutes, valutesRequested } from '@entities/valutes'
import { ItemMenu } from '@features/save-item'
import { Confirm } from '@shared/ui'

import { ItemsViewProps } from './interfaces'

export const ItemsView: React.FC<ItemsViewProps> = ({
  items,
  categoryUrl,
  search,
  loading,
  onCategoryChange,
  onSearchChange,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [changeDialog, setChangeDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)

  const [deletedItem, setDeletedItem] = useState<Item | null>(null)
  const [changedItem, setChangedItem] = useState<Item | null>(null)

  const [
    allCategoriesDB,
    loadCategories,
    loadCountries,
    removeItem,
    valutes,
    loadValutes,
  ] = useUnit([
    $categories,
    getCategoriesFx,
    countriesRequested,
    deleteItemFx,
    $valutes,
    valutesRequested,
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

  const setChangeItem = (item: Item) => {
    setChangedItem(item)
    setChangeDialog(true)
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flex: '1 1 420px',
            flexWrap: 'wrap',
            minWidth: 0,
          }}
        >
          <TextField
            size='small'
            label='Поиск'
            placeholder='Название товара'
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            sx={{ minWidth: 220, flex: '1 1 220px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon fontSize='small' color='action' />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl size='small' sx={{ minWidth: 220, flex: '1 1 220px' }}>
            <InputLabel id='items-category-filter-label' shrink>
              Категория
            </InputLabel>
            <Select
              labelId='items-category-filter-label'
              value={categoryFilterValue}
              onChange={handleCategoryFilterChange}
              input={<OutlinedInput notched label='Категория' />}
              displayEmpty
            >
              <MenuItem value=''>Все товары</MenuItem>
              {categories.map(({ id, name, url }) => (
                <MenuItem key={id} value={url}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setAddDialog(true)}
        >
          Добавить
        </Button>
      </Box>

      <ItemsTable
        items={items}
        loading={loading}
        setDeleteItem={setDeleteItem}
        setChangeItem={setChangeItem}
      />

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title={`Вы уверены, что хотите удалить товар ${
          deletedItem?.name || ''
        }?`}
      >
        <Button
          variant='outlined'
          color='success'
          onClick={() => deleteItem(deletedItem?.id || 0)}
        >
          Удалить
        </Button>
      </Confirm>

      {changedItem && (
        <ItemMenu
          isOpen={changeDialog}
          item={changedItem}
          categories={categories}
          onClose={() => setChangeDialog(false)}
          valutes={valutes}
        />
      )}

      <ItemMenu
        isOpen={addDialog}
        categories={categories}
        onClose={() => setAddDialog(false)}
        valutes={valutes}
      />
    </Stack>
  )
}
