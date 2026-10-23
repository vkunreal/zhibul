import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'

import { ItemsFiltersProps } from './interfaces'

import s from './styles.module.scss'

export const ItemsFilters = ({
  search,
  categoryUrl,
  categories,
  onSearchChange,
  onCategoryChange,
}: ItemsFiltersProps) => {
  return (
    <Box className={s.filters}>
      <TextField
        size='small'
        label='Поиск'
        placeholder='Название или артикул'
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className={s.field}
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

      <FormControl size='small' className={s.field}>
        <InputLabel id='items-category-filter-label' shrink>
          Категория
        </InputLabel>
        <Select
          labelId='items-category-filter-label'
          value={categoryUrl}
          onChange={onCategoryChange}
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
  )
}
