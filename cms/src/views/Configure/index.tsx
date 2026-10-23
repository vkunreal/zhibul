import { Stack } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useModal } from '@app/contexts/ModalContext'
import { countriesRequested } from '@entities/countries'
import {
  $categories,
  $configureItem,
  $configureItemLoading,
  $itemImages,
  configureItemRequested,
  deleteItemImageFx,
  getCategoriesFx,
  getItemImagesFx,
  setMainItemImageFx,
  uploadItemImagesFx,
} from '@entities/items'
import { CategoryOption } from '@entities/items/model'
import { ItemStatusChips } from '@entities/items/ui/ItemStatusChips'
import { $valutes, valutesRequested } from '@entities/valutes'
import { ItemFormValues } from '@features/save-item/interfaces'
import { changeItemSubmitted } from '@features/save-item/model'
import { env } from '@shared/config'
import {
  DetailHeader,
  EditableImageGallery,
  Panel,
  RecordState,
  SiteLink,
} from '@shared/ui'
import { filesToFormData, toPositiveId } from '@shared/utils'
import { FileManager } from '@widgets/item-files/FileManager'
import { OptionsList } from '@widgets/item-options/OptionsList'

import { ConfigureImage } from './ui/ConfigureImage'
import { ConfigureProperties } from './ui/ConfigureProperties'

import s from './styles.module.scss'

export const Configure: React.FC = () => {
  const { item_id } = useParams()
  const navigate = useNavigate()
  const { open } = useModal()
  const [
    item,
    loading,
    images,
    imagesLoading,
    valutes,
    allCategories,
    loadItem,
    loadImages,
    loadValutes,
    loadCategories,
    loadCountries,
    changeItem,
    uploadImages,
    setMainImage,
    removeImage,
  ] = useUnit([
    $configureItem,
    $configureItemLoading,
    $itemImages,
    getItemImagesFx.pending,
    $valutes,
    $categories,
    configureItemRequested,
    getItemImagesFx,
    valutesRequested,
    getCategoriesFx,
    countriesRequested,
    changeItemSubmitted,
    uploadItemImagesFx,
    setMainItemImageFx,
    deleteItemImageFx,
  ])

  const itemId = toPositiveId(item_id)

  useLayoutEffect(() => {
    if (itemId === null) return
    loadItem(itemId)
  }, [itemId, loadItem])

  useEffect(() => {
    if (!item || itemId === null || item.id !== itemId) return
    loadImages(item.id)
  }, [item, itemId, loadImages])

  useEffect(() => {
    loadValutes()
    loadCategories()
    loadCountries()
  }, [loadValutes, loadCategories, loadCountries])

  const categories = useMemo<CategoryOption[]>(
    () =>
      allCategories
        .filter((category) => !category.hasSubcategories)
        .map(({ id, name, url }) => ({ id, name, url }))
        .sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    [allCategories],
  )

  const openEdit = () => {
    if (!item) return

    const onSubmit = (values: ItemFormValues) => {
      changeItem({ values, item })
    }

    open('itemModal', { item, categories, valutes, onSubmit })
  }

  if (itemId === null || !item || item.id !== itemId) {
    return (
      <RecordState
        className={s.page}
        backLabel='К товарам'
        onBack={() => navigate('/items')}
        missing={itemId === null || (!loading && !item)}
        missingText='Товар не найден'
      />
    )
  }

  const siteUrl = `${env.siteUrl}/menu/${item.categoryUrl}/${item.url}`
  const valuteTitle = valutes.find(
    (valute) => valute.id === item.valuteId,
  )?.title

  return (
    <Stack spacing={2.5} className={s.page}>
      <DetailHeader
        backLabel='К товарам'
        onBack={() =>
          navigate(item.categoryUrl ? `/items/${item.categoryUrl}` : '/items')
        }
        title={item.name || 'Товар'}
        meta={
          [item.code, item.url ? `/${item.url}` : '']
            .filter(Boolean)
            .join(' · ') || '—'
        }
        chips={
          <ItemStatusChips
            isActive={item.isActive}
            isOrderOnly={item.isOrderOnly}
          />
        }
        actions={<SiteLink href={siteUrl} />}
      />

      <EditableImageGallery
        images={images}
        loading={imagesLoading}
        onUpload={(files) =>
          uploadImages({
            itemId: item.id,
            formData: filesToFormData(files),
          })
        }
        renderImage={(image, editing) => (
          <ConfigureImage
            src={image.src}
            editable={editing}
            isMain={image.isMain}
            onRemove={() => removeImage({ itemId: item.id, src: image.src })}
            onMakeMain={() => setMainImage({ itemId: item.id, src: image.src })}
          />
        )}
      />

      <ConfigureProperties
        item={item}
        valuteTitle={valuteTitle}
        onEdit={openEdit}
      />

      <Panel title='Файлы'>
        <FileManager itemId={item.id} />
      </Panel>

      <Panel title='Опции'>
        <OptionsList itemId={item.id} />
      </Panel>
    </Stack>
  )
}
