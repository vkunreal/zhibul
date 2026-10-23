import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { variablesList } from '@shared/constants'
import { FormModal, FormTextField } from '@shared/ui'

import { emptyVariableForm } from './constants'
import { ChangeVariableMenuProps } from './interfaces'
import { toVariableForm } from './mappers'

export const ChangeVariableMenu: React.FC<ChangeVariableMenuProps> = ({
  isOpen,
  variable,
  onClose,
  onSubmit: submitVariable,
}) => {
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: emptyVariableForm,
  })

  const onSubmit = handleSubmit((values) => {
    submitVariable(values)
    onClose()
  })

  useEffect(() => {
    reset(toVariableForm(variable))
  }, [isOpen, reset, variable])

  const name = watch('name')
  const value = watch('value')

  return (
    <FormModal
      isOpen={isOpen}
      title={variable ? 'Изменение переменной' : 'Добавление переменной'}
      onClose={onClose}
      onSubmit={onSubmit}
      submitDisabled={!name.trim() || !value.trim()}
    >
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <FormControl variant='standard' fullWidth>
            <InputLabel id='change-variable-label'>Переменная</InputLabel>
            <Select
              labelId='change-variable-label'
              value={field.value}
              onChange={field.onChange}
            >
              {variablesList.map(({ type, name }) => (
                <MenuItem key={type} value={type}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <FormTextField
        control={control}
        name='value'
        textFieldProps={{ placeholder: 'Значение' }}
      />
    </FormModal>
  )
}
