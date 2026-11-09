import { createEffect, createStore, sample } from 'effector'

import {
  addVariable,
  changeVariable,
  deleteVariable,
  getVariables,
} from '@shared/api'

import { Variable } from '../model'

export const getVariablesFx = createEffect(getVariables)
export const addVariableFx = createEffect(addVariable)
export const changeVariableFx = createEffect(changeVariable)
export const deleteVariableFx = createEffect((id: number) =>
  deleteVariable({ id }),
)

export const $variables = createStore<Variable[]>([]).on(
  getVariablesFx.doneData,
  (_, variables) => variables,
)

const reloadVariables = getVariablesFx.prepend(() => undefined)

sample({
  clock: [addVariableFx.done, changeVariableFx.done, deleteVariableFx.done],
  target: reloadVariables,
})
