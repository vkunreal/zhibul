import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import {
  $itemPages,
  $items,
  $itemsLoading,
  $pageLimit,
  ITEMS_PAGE_LIMIT_OPTIONS,
  itemsRequested,
  pageLimitChanged,
} from '@entities/items'
import { PageHeader } from '@shared/ui'
import { ItemsView } from '@widgets/items/ItemsView'

import { useItemsQuery } from './hook'

import s from './styles.module.scss'

export const Items: React.FC = () => {
  const [items, itemPages, pageLimit, loading, loadItems, changePageLimit] =
    useUnit([
      $items,
      $itemPages,
      $pageLimit,
      $itemsLoading,
      itemsRequested,
      pageLimitChanged,
    ])
  const {
    categoryUrl,
    search,
    searchInput,
    setSearchInput,
    page,
    onCategoryChange,
    resetPage,
    onPageChange,
  } = useItemsQuery(itemPages)

  useEffect(() => {
    loadItems({ page, categoryUrl, search })
  }, [loadItems, page, categoryUrl, pageLimit, search])

  const handlePageLimitChange = (event: SelectChangeEvent<number>) => {
    resetPage()
    changePageLimit(Number(event.target.value))
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader title='Товары' subtitle='Каталог позиций, цены и видимость' />

      <ItemsView
        items={items}
        categoryUrl={categoryUrl}
        search={searchInput}
        loading={loading}
        onCategoryChange={onCategoryChange}
        onSearchChange={setSearchInput}
      />

      <Box className={s.footer}>
        <FormControl size='small' className={s.pageLimit}>
          <InputLabel id='items-page-limit-label'>На странице</InputLabel>
          <Select
            labelId='items-page-limit-label'
            label='На странице'
            value={pageLimit}
            onChange={handlePageLimitChange}
          >
            {ITEMS_PAGE_LIMIT_OPTIONS.map((limit) => (
              <MenuItem key={limit} value={limit}>
                {limit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Pagination
          count={itemPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          size='large'
          color='primary'
        />
      </Box>
    </Stack>
  )
}
