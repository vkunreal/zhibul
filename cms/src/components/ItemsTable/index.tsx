import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
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
              <TableCell align="center">{item.category}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell align="center">
                <Button variant="outlined" onClick={() => setChangeItem(item)}>
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
