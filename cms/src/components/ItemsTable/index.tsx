import {
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
}

export const ItemsTable: React.FC<IItemsTableProps> = ({ items }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Категория</TableCell>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Описание</TableCell>
            <TableCell align="center">Бренд</TableCell>
            <TableCell align="center">Производитель</TableCell>
            <TableCell align="center">Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(
            ({
              id,
              category,
              name,
              description,
              brand,
              manufacturer,
              price,
            }) => (
              <TableRow key={id}>
                <TableCell align="center">{category}</TableCell>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{description}</TableCell>
                <TableCell align="center">{brand}</TableCell>
                <TableCell align="center">{manufacturer}</TableCell>
                <TableCell align="center">{price}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
