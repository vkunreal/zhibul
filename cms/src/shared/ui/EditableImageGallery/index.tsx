import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Button, Stack } from '@mui/material'
import { Fragment } from 'react'

import { Gallery } from '../Gallery'
import { Panel } from '../Panel'
import { PreviewImage } from '../PreviewImage'

import { useImageDrafts } from './hook'
import { EditableImageGalleryProps, GalleryImage } from './interfaces'

const emptyGalleryText = 'Нет изображений — нажмите «Изменить», чтобы загрузить'

export function EditableImageGallery<T extends GalleryImage>({
  images,
  loading = false,
  emptyText = emptyGalleryText,
  onUpload,
  onRemove,
  renderImage,
}: EditableImageGalleryProps<T>) {
  const {
    fileRef,
    drafts,
    editing,
    openFileDialog,
    handleFiles,
    removeDraft,
    startEditing,
    cancelEditing,
    save,
  } = useImageDrafts(onUpload)

  return (
    <Panel
      title='Изображения'
      padded={false}
      actions={
        <>
          <input
            type='file'
            hidden
            accept='image/jpeg,image/png'
            ref={fileRef}
            onChange={handleFiles}
            multiple
          />
          {editing ? (
            <Stack direction='row' spacing={1}>
              <Button
                size='small'
                variant='contained'
                color='success'
                onClick={save}
              >
                Готово
              </Button>
              <Button size='small' variant='outlined' onClick={openFileDialog}>
                Загрузить
              </Button>
              <Button size='small' color='inherit' onClick={cancelEditing}>
                Отмена
              </Button>
            </Stack>
          ) : (
            <Button
              size='small'
              variant='outlined'
              startIcon={<EditOutlinedIcon />}
              onClick={startEditing}
            >
              Изменить
            </Button>
          )}
        </>
      }
    >
      <Gallery
        loading={loading}
        empty={images.length === 0 && drafts.length === 0}
        emptyText={emptyText}
      >
        {images.map((image, index) =>
          renderImage ? (
            <Fragment key={image.src + index}>
              {renderImage(image, editing)}
            </Fragment>
          ) : (
            <PreviewImage
              key={image.src + index}
              src={image.src}
              onRemove={editing && onRemove ? () => onRemove(image) : undefined}
            />
          ),
        )}

        {drafts.map((image, index) => (
          <PreviewImage
            key={image.name + index}
            src={image.src}
            pending
            onRemove={editing ? () => removeDraft(image.name) : undefined}
          />
        ))}
      </Gallery>
    </Panel>
  )
}
