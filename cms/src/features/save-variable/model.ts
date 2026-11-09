import { createEvent, sample } from 'effector'

import { addVariableFx, changeVariableFx } from '@entities/variables'

import { ChangeVariablePayload, VariableFormValues } from './interfaces'

export const createVariableSubmitted = createEvent<VariableFormValues>()
export const changeVariableSubmitted = createEvent<ChangeVariablePayload>()

const filled = ({ name, value }: VariableFormValues) =>
  !!name.trim() && !!value.trim()

sample({
  clock: createVariableSubmitted,
  filter: filled,
  fn: ({ name, value }) => ({ name, value }),
  target: addVariableFx,
})

sample({
  clock: changeVariableSubmitted,
  filter: ({ values }) => filled(values),
  fn: ({ values, variable }) => ({
    id: variable.id,
    name: values.name,
    value: values.value,
  }),
  target: changeVariableFx,
})
