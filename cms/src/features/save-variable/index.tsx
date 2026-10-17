import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { variablesList } from '@shared/constants'
import { FormModal, FormTextField } from '@shared/ui'

import { emptyVariableForm } from './constants'
import { ChangeVariableMenuProps } from './interfaces'
import { changeVariableSubmitted, createVariableSubmitted } from './model'

export const ChangeVariableMenu: React.FC<ChangeVariableMenuProps> = ({
  isOpen,
  title,
  variable,
  onClose,
}) => {
  const [createVariable, updateVariable] = useUnit([
    createVariableSubmitted,
    changeVariableSubmitted,
  ])
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: emptyVariableForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (variable) updateVariable({ values, variable })
    else createVariable(values)
    onClose()
  })

  useEffect(() => {
    reset({
      name: variable?.name || emptyVariableForm.name,
      value: variable?.value || emptyVariableForm.value,
    })
  }, [isOpen, reset, variable])

  const name = watch('name')
  const value = watch('value')

  return (
    <FormModal
      isOpen={isOpen}
      title={title}
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
