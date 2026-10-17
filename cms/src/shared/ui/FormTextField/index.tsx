import { TextField } from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'

import { FormTextFieldProps } from './interfaces'

export function FormTextField<T extends FieldValues>({
  control,
  name,
  textFieldProps,
  parseValue,
}: FormTextFieldProps<T>) {
  const { onChange, ...restTextFieldProps } = textFieldProps ?? {}

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...restTextFieldProps}
          {...field}
          value={field.value ?? ''}
          onChange={(event) => {
            field.onChange(parseValue ? parseValue(event.target.value) : event)
            onChange?.(event)
          }}
        />
      )}
    />
  )
}
