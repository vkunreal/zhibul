import { Button } from '@mui/material'
import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'

import { uploadCategoryImageFx } from '@entities/items'
import { FilePreview } from '@shared/model'
import { readFileAsDataUrl } from '@shared/utils'

import { categoryImageUploadSubmitted } from '../../model'

import { CategoryImageProps } from './interfaces'

import s from './styles.module.scss'

export const CategoryImage = ({
  category,
  onFileChange,
}: CategoryImageProps) => {
  const [overrideSrc, setOverrideSrc] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [loadedImage, setLoadedImage] = useState<FilePreview | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const uploadImage = useUnit(categoryImageUploadSubmitted)
  const savedSrc = overrideSrc ?? category?.image ?? ''

  useEffect(() => {
    if (!category) return

    return uploadCategoryImageFx.done.watch(({ params, result }) => {
      if (params.id !== category.id) return

      setOverrideSrc(result.url)
      setLoadedImage(null)
      setSelectedImage(null)
      onFileChange(null)
    })
  }, [category, onFileChange])

  const handleChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedImage(file)
    onFileChange(file)
    setLoadedImage({ name: file.name, src: await readFileAsDataUrl(file) })
  }

  const loadImage = () => {
    if (!category || !selectedImage) return
    uploadImage({ id: category.id, image: selectedImage })
  }

  return (
    <>
      {savedSrc && !loadedImage && (
        <img src={savedSrc} className={s.preview} alt='Category image' />
      )}
      {loadedImage && (
        <img
          src={loadedImage.src}
          className={s.previewLoaded}
          alt='Loaded image'
        />
      )}

      <input
        type='file'
        className={s.fileInput}
        accept='image/jpeg,image/png'
        ref={fileRef}
        onChange={handleChangeInput}
      />

      <div className={s.actions}>
        <Button
          type='button'
          variant='outlined'
          color='warning'
          onClick={() => fileRef.current?.click()}
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
    </>
  )
}
