import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'

import { FormModal, FormTextField } from '@shared/ui'

import { emptyOption } from './constants'
import { AddOptionMenuProps } from './interfaces'
import { addOptionSubmitted } from './model'

export const AddOptionMenu: React.FC<AddOptionMenuProps> = ({
  isOpen,
  itemId,
  position,
  onClose,
}) => {
  const submitOption = useUnit(addOptionSubmitted)
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyOption,
  })

  const onSubmit = handleSubmit((values) => {
    submitOption({ ...values, itemId, position })
    reset(emptyOption)
  })

  return (
    <FormModal
      isOpen={isOpen}
      title='Добавление опции'
      onClose={onClose}
      onSubmit={onSubmit}
      submitText='Добавить'
    >
      <FormTextField
        control={control}
        name='name'
        textFieldProps={{ label: 'Название', autoComplete: 'off' }}
      />
      <FormTextField
        control={control}
        name='value'
        textFieldProps={{ label: 'Значение', autoComplete: 'off' }}
      />
    </FormModal>
  )
}
