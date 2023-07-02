import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { IItem } from '../../interfaces/Items'

interface IItemsTableProps {
  items: IItem[]
  setDeleteItem: (item: IItem) => void
  setChangeItem: (item: IItem) => void
}

export const ItemsTable: React.FC<IItemsTableProps> = ({
  items,
  setDeleteItem,
  setChangeItem,
}) => {
  const navigate = useNavigate()

  const configureItem = (item: IItem) => {
    navigate('/configure', { state: { item } })
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Категория</TableCell>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.category_name}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell className="d-flex flex-column" align="center">
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => configureItem(item)}
                >
                  Настроить
                </Button>
                <Button
                  className="ml-2"
                  variant="outlined"
                  onClick={() => setChangeItem(item)}
                >
                  Изменить
                </Button>
                <Button
                  className="ml-2"
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteItem(item)}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
