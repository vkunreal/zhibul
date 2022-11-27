import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ChangeVariableMenu } from '../../components/ChangeVariableMenu'
import { IVariable } from '../../interfaces/App'
import {
  addVariableDB,
  changeVariableDB,
  deleteVariableDB,
  getVariablesDB,
} from '../../store/variables/actions'
import { selectVariables } from '../../store/variables/selectors'
import AddVariableButton from '../../components/AddButton'

export const Variables: React.FC = () => {
  const [changeMenu, setChangeMenu] = useState(false)
  const [addMenu, setAddMenu] = useState(false)
  const [changedVariable, setChangedVariable] = useState<IVariable | null>(null)

  const variables = useSelector(selectVariables)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVariablesDB())
  }, [])

  const deleteVariable = (id: number) => {
    dispatch(deleteVariableDB(id))
  }

  const openChangeMenu = (variable: IVariable) => {
    setChangedVariable(variable)
    setChangeMenu(true)
  }

  const changeVariable = (variable: IVariable) => {
    dispatch(changeVariableDB(variable))
    setChangeMenu(false)
  }

  const addVariable = (variable: IVariable) => {
    dispatch(addVariableDB(variable))
    setAddMenu(false)
  }

  return (
    <div className="pd-4">
      <h1>Глобальные переменные</h1>

      <p className="mt-2 mb-4">
        Глобальные переменные - раздел, в котором хранятся статические данные,
        которые отображаются на сайте.
      </p>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Переменная</TableCell>
              <TableCell align="center">Значение</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variables.map((variable) => (
              <TableRow key={variable.id}>
                <TableCell align="center">{variable.name}</TableCell>
                <TableCell align="center">{variable.value}</TableCell>
                <TableCell align="center">
                  <Button
                    className="mr-2"
                    variant="outlined"
                    color="primary"
                    onClick={() => openChangeMenu(variable)}
                  >
                    Изменить
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteVariable(variable.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddVariableButton className="mt-2" onClick={() => setAddMenu(true)}>
        Добавить переменную
      </AddVariableButton>

      <ChangeVariableMenu
        title="Добавление переменной"
        isOpen={addMenu}
        onClose={() => setAddMenu(false)}
        saveVariable={addVariable}
      />

      <ChangeVariableMenu
        title="Изменение переменной"
        variable={changedVariable}
        isOpen={changeMenu}
        onClose={() => setChangeMenu(false)}
        saveVariable={changeVariable}
      />
    </div>
  )
}
