import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ICategory } from '../../interfaces/Items'

interface IChangeCategoryMenuProps {
  category: ICategory
  isOpen: boolean
  saveCategory: (category: ICategory) => void
  onClose: () => void
}

export const ChangeCategoryMenu: React.FC<IChangeCategoryMenuProps> = ({
  isOpen,
  category,
  saveCategory,
  onClose,
}) => {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(category?.name)
  }, [category])

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Изменение категории</DialogTitle>

      <DialogContent className="d-flex flex-column g-3">
        <TextField
          placeholder="Название"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <div className="d-flex g-2 justify-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              const newCategory = { ...category, name }
              saveCategory(newCategory)
            }}
          >
            Сохранить
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
