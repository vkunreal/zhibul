import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import {
  $variables,
  deleteVariableFx,
  getVariablesFx,
} from '@entities/variables'
import { Variable } from '@entities/variables/model'
import { VariableFormValues } from '@features/save-variable/interfaces'
import {
  changeVariableSubmitted,
  createVariableSubmitted,
} from '@features/save-variable/model'
import { variablesList } from '@shared/constants'
import { Confirm, FetchState, PageHeader } from '@shared/ui'

import { VariableCard } from './ui/VariableCard'

import s from './styles.module.scss'

const getVariableLabel = (name: string) =>
  variablesList.find(({ type }) => type === name)?.name || name

export const Variables: React.FC = () => {
  const [deletedVariable, setDeletedVariable] = useState<Variable | null>(null)
  const { open } = useModal()

  const [
    variables,
    loading,
    loadVariables,
    removeVariable,
    createVariable,
    changeVariable,
  ] = useUnit([
    $variables,
    getVariablesFx.pending,
    getVariablesFx,
    deleteVariableFx,
    createVariableSubmitted,
    changeVariableSubmitted,
  ])

  useEffect(() => {
    loadVariables()
  }, [loadVariables])

  const openVariableModal = (variable: Variable | null) => {
    const onSubmit = (values: VariableFormValues) => {
      if (variable) changeVariable({ values, variable })
      else createVariable(values)
    }

    open('variableModal', { variable, onSubmit })
  }

  const confirmDelete = () => {
    if (!deletedVariable) return
    removeVariable(deletedVariable.id)
    setDeletedVariable(null)
  }

  return (
    <Stack spacing={2.5} className={s.page}>
      <PageHeader
        title='Переменные'
        subtitle='Статические данные, которые отображаются на сайте'
        actions={
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => openVariableModal(null)}
          >
            Добавить
          </Button>
        }
      />

      <FetchState
        loading={loading}
        empty={variables.length === 0}
        emptyText='Пока нет переменных — создайте первую'
      >
        <Stack spacing={1.5}>
          {variables.map((variable) => (
            <VariableCard
              key={variable.id}
              variable={variable}
              label={getVariableLabel(variable.name)}
              onEdit={() => openVariableModal(variable)}
              onDelete={() => setDeletedVariable(variable)}
            />
          ))}
        </Stack>
      </FetchState>

      <Confirm
        isOpen={deletedVariable !== null}
        onClose={() => setDeletedVariable(null)}
        title={`Удалить переменную «${
          deletedVariable ? getVariableLabel(deletedVariable.name) : ''
        }»?`}
      >
        <Button variant='outlined' color='success' onClick={confirmDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
