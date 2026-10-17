import { createEffect, createStore, sample } from 'effector'

import {
  addCategory,
  changeCategory,
  deleteCategory,
  getCategories,
  setCategoryActive,
  uploadCategoryImage,
} from '@shared/api'

import { Category } from '../model'
import { toCategory } from '../utils/mappers'

import { CategoryImageUpload, NewCategory } from './interfaces'

export const getCategoriesFx = createEffect(getCategories)
export const addCategoryFx = createEffect(
  async ({ category, image }: NewCategory) => {
    const { data } = await addCategory(category)
    if (image) await uploadCategoryImage(data.id, image)
  },
)
export const changeCategoryFx = createEffect(changeCategory)
export const deleteCategoryFx = createEffect(deleteCategory)
export const setCategoryActiveFx = createEffect(setCategoryActive)
export const uploadCategoryImageFx = createEffect(
  ({ id, image }: CategoryImageUpload) => uploadCategoryImage(id, image),
)

export const $categories = createStore<Category[]>([])
  .on(getCategoriesFx.doneData, (_, categories) => categories.map(toCategory))
  .on(setCategoryActiveFx.done, (categories, { params, result }) =>
    categories.map((category) =>
      category.id === params.id
        ? { ...category, isActive: result.active }
        : category,
    ),
  )
  .on(uploadCategoryImageFx.done, (categories, { params, result }) =>
    categories.map((category) =>
      category.id === params.id ? { ...category, image: result.url } : category,
    ),
  )

const refreshCategories = getCategoriesFx.prepend(() => undefined)

sample({
  clock: [addCategoryFx.done, changeCategoryFx.done, deleteCategoryFx.done],
  target: refreshCategories,
})
