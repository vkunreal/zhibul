import AddIcon from '@mui/icons-material/Add'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import {
  $options,
  changeOptionPositionsFx,
  getOptionsFx,
} from '@entities/options'
import { ItemOption, OptionPosition } from '@entities/options/model'
import { OptionElem } from '@entities/options/ui/OptionElem'
import { OptionDragEvent } from '@entities/options/ui/OptionElem/interfaces'
import { AddOptionMenu } from '@features/add-option'

import { OptionsListProps } from './interfaces'

export const OptionsList: React.FC<OptionsListProps> = ({ itemId }) => {
  const [options, loadOptions, savePositions] = useUnit([
    $options,
    getOptionsFx,
    changeOptionPositionsFx,
  ])
  const [items, setItems] = useState<ItemOption[]>(options)
  const [positions, setPositions] = useState<OptionPosition[]>([])
  const [currentOption, setCurrentOption] = useState<ItemOption | null>(null)
  const [optionDialog, setOptionDialog] = useState(false)

  useEffect(() => {
    loadOptions(itemId)
  }, [itemId, loadOptions])

  useEffect(() => {
    setItems(options)
  }, [options])

  useEffect(() => {
    setPositions(items.map((i) => ({ id: i.id, position: i.position })))
  }, [items])

  const onDragStart = (_: OptionDragEvent, option: ItemOption) => {
    setCurrentOption(option)
  }
  const onDragLeave = (e: OptionDragEvent) => {
    e.currentTarget.style.opacity = '1'
  }
  const onDragOver = (e: OptionDragEvent) => {
    e.preventDefault()
    e.currentTarget.style.opacity = '0.85'
  }

  const onDrop = (e: OptionDragEvent, option: ItemOption) => {
    if (!currentOption) return
    e.preventDefault()
    e.currentTarget.style.opacity = '1'
    const nItems = items.map((c) => {
      if (c.id === option.id) {
        return { ...c, position: currentOption.position }
      } else if (c.id === currentOption.id) {
        return { ...c, position: option.position }
      }
      return c
    })
    setItems(nItems)
    setPositions(nItems.map((i) => ({ id: i.id, position: i.position })))
  }

  const sortOptions = (a: ItemOption, b: ItemOption) => {
    if (a.position > b.position) return 1
    return -1
  }

  const cancelDiffs = () => {
    setItems(options)
  }

  const saveOptionsPositions = () => {
    savePositions({ positions, itemId })
  }

  const nextPosition = positions.length
    ? Math.max(...positions.map((position) => position.position)) + 1
    : 1

  const orderChanged =
    items.length > 0 &&
    items.some((item) => {
      const original = options.find((option) => option.id === item.id)
      return original && original.position !== item.position
    })

  return (
    <Stack spacing={2}>
      <Alert severity='info' variant='outlined' sx={{ py: 0.5 }}>
        Для выпадающего меню включите галочку и укажите значения через дефис,
        например: 1.1-1.2-1.3. Перетаскивайте карточки, чтобы менять порядок.
      </Alert>

      {items.length === 0 ? (
        <Typography color='text.secondary'>
          Опций пока нет — добавьте первую
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {[...items].sort(sortOptions).map((option, i) => (
            <OptionElem
              option={option}
              itemId={itemId}
              id={'c' + i}
              key={option.id}
              onDragStart={onDragStart}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </Stack>
      )}

      <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOptionDialog(true)}
        >
          Добавить опцию
        </Button>
        {orderChanged && (
          <>
            <Button
              variant='outlined'
              color='success'
              onClick={saveOptionsPositions}
            >
              Сохранить порядок
            </Button>
            <Button variant='outlined' color='inherit' onClick={cancelDiffs}>
              Отменить
            </Button>
          </>
        )}
      </Stack>

      <AddOptionMenu
        isOpen={optionDialog}
        itemId={itemId}
        position={nextPosition}
        onClose={() => setOptionDialog(false)}
      />
    </Stack>
  )
}
