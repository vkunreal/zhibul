import { Alert, Button, Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { useModal } from '@app/contexts/ModalContext'
import {
  $options,
  changeOptionPositionsFx,
  deleteOptionsFx,
  getOptionsFx,
} from '@entities/options'
import { ItemOption, OptionPosition } from '@entities/options/model'
import { OptionElem } from '@entities/options/ui/OptionElem'
import { OptionDragEvent } from '@entities/options/ui/OptionElem/interfaces'
import { Confirm, FetchState } from '@shared/ui'

import { OptionsListProps } from './interfaces'
import { reorderOptions, sortByPosition } from './reorder'
import { OptionsToolbar } from './ui/OptionsToolbar'

import s from './styles.module.scss'

export const OptionsList: React.FC<OptionsListProps> = ({ itemId }) => {
  const [options, loading, loadOptions, savePositions, removeOptions] =
    useUnit([
      $options,
      getOptionsFx.pending,
      getOptionsFx,
      changeOptionPositionsFx,
      deleteOptionsFx,
    ])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [items, setItems] = useState<ItemOption[]>(options)
  const [positions, setPositions] = useState<OptionPosition[]>([])
  const [dragId, setDragId] = useState<number | null>(null)
  const [overId, setOverId] = useState<number | null>(null)
  const { open } = useModal()

  useEffect(() => {
    loadOptions(itemId)
  }, [itemId, loadOptions])

  useEffect(() => {
    setItems(options)
  }, [options])

  useEffect(() => {
    setPositions(items.map((i) => ({ id: i.id, position: i.position })))
  }, [items])

  const clearDrag = () => {
    setDragId(null)
    setOverId(null)
  }

  const onDragStart = (_: OptionDragEvent, option: ItemOption) => {
    setDragId(option.id)
  }

  const onDragOver = (event: OptionDragEvent, option: ItemOption) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (option.id !== dragId) setOverId(option.id)
  }

  const onDrop = (event: OptionDragEvent, option: ItemOption) => {
    event.preventDefault()
    if (dragId !== null) setItems(reorderOptions(items, dragId, option.id))
    clearDrag()
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
      <Alert severity='info' variant='outlined' className={s.hint}>
        Для выпадающего меню включите галочку и укажите значения через дефис,
        например: 1.1-1.2-1.3. Порядок меняется перетаскиванием за значок слева,
        затем нажмите «Сохранить порядок».
      </Alert>

      <FetchState
        loading={loading}
        empty={items.length === 0}
        emptyText='Опций пока нет — добавьте первую'
        framed={false}
      >
        <Stack spacing={1.25}>
          {[...items].sort(sortByPosition).map((option, i) => (
            <OptionElem
              option={option}
              itemId={itemId}
              id={'c' + i}
              key={option.id}
              isDragging={option.id === dragId}
              isOver={option.id === overId}
              onDragStart={onDragStart}
              onDragEnd={clearDrag}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </Stack>
      </FetchState>

      <OptionsToolbar
        onAdd={() => open('optionModal', { itemId, position: nextPosition })}
        canDeleteAll={items.length > 0}
        onDeleteAll={() => setDeleteDialog(true)}
        orderChanged={orderChanged}
        onSave={saveOptionsPositions}
        onCancel={cancelDiffs}
      />

      <Confirm
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        title='Вы точно хотите удалить все опции?'
      >
        <Button
          variant='outlined'
          color='success'
          onClick={() => {
            setDeleteDialog(false)
            removeOptions(itemId)
          }}
        >
          Удалить
        </Button>
      </Confirm>
    </Stack>
  )
}
