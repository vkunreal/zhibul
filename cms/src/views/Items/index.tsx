import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import {
  $itemPages,
  $items,
  $itemsLoading,
  $pageLimit,
  ITEMS_PAGE_LIMIT_OPTIONS,
  itemsRequested,
  pageLimitChanged,
} from '@entities/items'
import { ItemsView } from '@widgets/items/ItemsView'

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
  const { url: categoryUrl = '' } = useParams()

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextSearch = searchInput.trim()
      setSearch((prev) => (prev === nextSearch ? prev : nextSearch))
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setPage(1)
  }, [search])

  useEffect(() => {
    loadItems({ page, categoryUrl, search })
  }, [loadItems, page, categoryUrl, pageLimit, search])

  // После удаления последнего товара на последней странице её больше нет.
  useEffect(() => {
    if (itemPages > 0 && page > itemPages) setPage(itemPages)
  }, [itemPages, page])

  const handleCategoryChange = (nextCategoryUrl: string) => {
    setPage(1)
    navigate(nextCategoryUrl ? `/items/${nextCategoryUrl}` : '/items')
  }

  const handlePageLimitChange = (event: SelectChangeEvent<number>) => {
    setPage(1)
    changePageLimit(Number(event.target.value))
  }

  return (
    <Stack spacing={2.5} sx={{ p: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
          Товары
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          Каталог позиций, цены и видимость
        </Typography>
      </Box>

      <ItemsView
        items={items}
        categoryUrl={categoryUrl}
        search={searchInput}
        loading={loading}
        onCategoryChange={handleCategoryChange}
        onSearchChange={setSearchInput}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <FormControl size='small' sx={{ width: 120 }}>
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
          onChange={(_, value) => setPage(value)}
          size='large'
          color='primary'
        />
      </Box>
    </Stack>
  )
}
