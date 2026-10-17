import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { categorySortModeOptions, uploadCategoryImageFx } from '@entities/items'
import { FilePreview } from '@shared/model'
import { FormModal, FormTextField } from '@shared/ui'
import { readFileAsDataUrl } from '@shared/utils'

import { emptyCategoryForm } from './constants'
import { CategoryMenuProps } from './interfaces'
import {
  categoryImageUploadSubmitted,
  changeCategorySubmitted,
  createCategorySubmitted,
} from './model'

export const CategoryMenu = (props: CategoryMenuProps) => {
  const { isOpen, onClose } = props
  const category = props.category

  const [image, setImage] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [loadedImage, setLoadedImage] = useState<FilePreview | null>(null)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [createCategory, changeCategory, uploadImage] = useUnit([
    createCategorySubmitted,
    changeCategorySubmitted,
    categoryImageUploadSubmitted,
  ])
  const { control, reset, handleSubmit } = useForm({
    defaultValues: emptyCategoryForm,
  })

  const onSubmit = handleSubmit((values) => {
    if (props.category) {
      changeCategory({ values, category: props.category })
    } else {
      createCategory({
        values,
        parentId: props.parentId,
        image: selectedImage,
      })
      setLoadedImage(null)
      setSelectedImage(null)
    }

    onClose()
  })

  useEffect(() => {
    if (!category) return

    setImage(category.image)
    reset({
      name: category.name,
      url: category.url,
      position: category.position,
      description: category.description,
      seoTitle: category.seoTitle,
      seoDescription: category.seoDescription,
      seoKeywords: category.seoKeywords,
      sortMode: category.sortMode,
    })
  }, [category, reset])

  const handleFileLoad = () => fileRef.current?.click()

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedImage(file)
    setLoadedImage({ name: file.name, src: await readFileAsDataUrl(file) })
  }

  useEffect(() => {
    if (!category) return

    return uploadCategoryImageFx.done.watch(({ params, result }) => {
      if (params.id !== category.id) return

      setImage(result.url)
      setLoadedImage(null)
      setSelectedImage(null)
    })
  }, [category])

  const loadImage = () => {
    if (!category || !selectedImage) return

    uploadImage({ id: category.id, image: selectedImage })
  }

  return (
    <FormModal
      isOpen={isOpen}
      title={category ? 'Изменение категории' : 'Добавление категории'}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={category ? 'Сохранить' : 'Добавить'}
    >
      {image && !loadedImage && (
        <img
          src={image}
          style={{ height: 220, width: 220 }}
          alt='Category image'
        />
      )}
      {loadedImage && (
        <img
          src={loadedImage.src}
          style={{
            height: 220,
            width: 220,
            border: '3px solid rgb(0, 180, 0)',
            padding: 2,
          }}
          alt='Loaded image'
        />
      )}

      <input
        type='file'
        className='d-none'
        accept='image/jpeg,image/png'
        ref={fileRef}
        onChange={handleChangeInput}
      />

      <div className='d-flex g-2'>
        <Button
          type='button'
          variant='outlined'
          color='warning'
          onClick={handleFileLoad}
        >
          Загрузить картинку
        </Button>
        {category && (
          <Button
            type='button'
            variant='outlined'
            color='success'
            onClick={loadImage}
          >
            Сохранить
          </Button>
        )}
      </div>

      <FormTextField
        control={control}
        name='position'
        parseValue={(value) => parseInt(value)}
        textFieldProps={{ label: 'Позиция' }}
      />
      <FormTextField
        control={control}
        name='url'
        textFieldProps={{ label: 'URL' }}
      />
      <FormTextField
        control={control}
        name='name'
        textFieldProps={{ label: 'Название' }}
      />
      <FormTextField
        control={control}
        name='description'
        textFieldProps={{ label: 'Описание' }}
      />
      {/* Сортировка только у конечных категорий — в них лежат товары, не подкатегории. */}
      {(!category || !category.hasSubcategories) && (
        <Controller
          name='sortMode'
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size='small'>
              <InputLabel id='category-sort-mode-label'>
                Сортировка товаров
              </InputLabel>
              <Select
                labelId='category-sort-mode-label'
                label='Сортировка товаров'
                value={field.value}
                onChange={field.onChange}
              >
                {categorySortModeOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Доступна только для категорий с товарами, без подкатегорий
              </FormHelperText>
            </FormControl>
          )}
        />
      )}
      <FormTextField
        control={control}
        name='seoTitle'
        textFieldProps={{ label: 'SEO Title' }}
      />
      <FormTextField
        control={control}
        name='seoDescription'
        textFieldProps={{ label: 'SEO Description' }}
      />
      <FormTextField
        control={control}
        name='seoKeywords'
        textFieldProps={{ label: 'SEO Keywords' }}
      />
    </FormModal>
  )
}
