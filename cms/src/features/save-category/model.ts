import { createEvent, sample } from 'effector'

import {
  addCategoryFx,
  changeCategoryFx,
  uploadCategoryImageFx,
} from '@entities/items'
import { filesToFormData } from '@shared/utils'


import {
  CategoryFormValues,
  CategoryImagePayload,
  ChangeCategoryPayload,
  CreateCategoryPayload,
} from './interfaces'

export const createCategorySubmitted = createEvent<CreateCategoryPayload>()
export const changeCategorySubmitted = createEvent<ChangeCategoryPayload>()
export const categoryImageUploadSubmitted = createEvent<CategoryImagePayload>()

const fieldsFromForm = (values: CategoryFormValues) => ({
  name: values.name,
  url: values.url,
  position: values.position,
  description: values.description,
  seo_title: values.seoTitle,
  seo_description: values.seoDescription,
  seo_keywords: values.seoKeywords,
  sort_mode: values.sortMode,
})

sample({
  clock: createCategorySubmitted,
  fn: ({ values, parentId, image }) => ({
    category: {
      ...fieldsFromForm(values),
      parent_id: parentId,
    },
    image: image ? filesToFormData([image]) : null,
  }),
  target: addCategoryFx,
})

sample({
  clock: changeCategorySubmitted,
  fn: ({ values, category }) => ({
    id: category.id,
    ...fieldsFromForm(values),
  }),
  target: changeCategoryFx,
})

sample({
  clock: categoryImageUploadSubmitted,
  fn: ({ id, image }) => ({
    id,
    image: filesToFormData([image]),
  }),
  target: uploadCategoryImageFx,
})
