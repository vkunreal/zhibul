import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import {
  $variables,
  deleteVariableFx,
  getVariablesFx,
} from '@entities/variables'
import { Variable } from '@entities/variables/model'
import { ChangeVariableMenu } from '@features/save-variable'
import { variablesList } from '@shared/constants'
import { Confirm } from '@shared/ui'

const getVariableLabel = (name: string) =>
  variablesList.find(({ type }) => type === name)?.name || name

export const Variables: React.FC = () => {
  const [changeMenu, setChangeMenu] = useState(false)
  const [addMenu, setAddMenu] = useState(false)
  const [changedVariable, setChangedVariable] = useState<Variable | null>(null)
  const [deletedVariable, setDeletedVariable] = useState<Variable | null>(null)

  const [variables, loadVariables, removeVariable] = useUnit([
    $variables,
    getVariablesFx,
    deleteVariableFx,
  ])

  useEffect(() => {
    loadVariables()
  }, [loadVariables])

  const openChangeMenu = (variable: Variable) => {
    setChangedVariable(variable)
    setChangeMenu(true)
  }

  const confirmDelete = () => {
    if (!deletedVariable) return
    removeVariable(deletedVariable.id)
    setDeletedVariable(null)
  }

  return (
    <Stack spacing={2.5} sx={{ p: 3, maxWidth: 1200 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h4' component='h1' sx={{ fontWeight: 600 }}>
            Переменные
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
            Статические данные, которые отображаются на сайте
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setAddMenu(true)}
        >
          Добавить
        </Button>
      </Box>

      {variables.length === 0 ? (
        <Paper variant='outlined' sx={{ px: 3, py: 5, textAlign: 'center' }}>
          <Typography color='text.secondary'>
            Пока нет переменных — создайте первую
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {variables.map((variable) => (
            <Paper
              key={variable.id}
              variant='outlined'
              sx={{ overflow: 'hidden' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  bgcolor: 'grey.50',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                    {getVariableLabel(variable.name)}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      display: 'block',
                      mt: 0.25,
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {variable.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.25, flexShrink: 0 }}>
                  <Tooltip title='Изменить'>
                    <IconButton
                      size='small'
                      onClick={() => openChangeMenu(variable)}
                    >
                      <EditOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Удалить'>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => setDeletedVariable(variable)}
                    >
                      <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box sx={{ px: 2.5, py: 2 }}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ display: 'block', mb: 0.5, letterSpacing: 0.2 }}
                >
                  Значение
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: variable.value ? 'text.primary' : 'text.disabled',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.55,
                  }}
                >
                  {variable.value || '—'}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}

      <ChangeVariableMenu
        title='Добавление переменной'
        isOpen={addMenu}
        onClose={() => setAddMenu(false)}
      />

      <ChangeVariableMenu
        title='Изменение переменной'
        variable={changedVariable}
        isOpen={changeMenu}
        onClose={() => setChangeMenu(false)}
      />

      <Confirm
        isOpen={deletedVariable !== null}
        onClose={() => setDeletedVariable(null)}
        title={`Удалить переменную «${
          deletedVariable
            ? getVariableLabel(deletedVariable.name)
            : ''
        }»?`}
      >
        <Button variant='outlined' color='success' onClick={confirmDelete}>
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
