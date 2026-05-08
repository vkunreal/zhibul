'use client'

import { FormControl, InputLabel, MenuItem, NoSsr, Select } from '@mui/material'
import { FC } from 'react'

import { SelectOptionProps } from '../interfaces'

export const SelectOption: FC<SelectOptionProps> = ({ option }) => {
  const { id, name, value } = option

  const labelId = `${id}-label`

  const options = value ? value.split('-') : []
  const defaultValue = options.length > 0 ? options[0] : ''

  return (
    <NoSsr>
      <FormControl fullWidth variant="standard" sx={{ mb: 1 }}>
        <InputLabel id={labelId}>{name}</InputLabel>

        <Select
          labelId={labelId}
          id={`select-${id}`}
          label={name}
          defaultValue={defaultValue}
        >
          {value.split('-').map((valueOption) => (
            <MenuItem key={valueOption} value={valueOption}>
              {valueOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </NoSsr>
  )
}
