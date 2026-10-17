import type { AddCategoryDTO } from '@shared/api'

/** Какую страницу таблицы товаров показываем. Пустой categoryUrl — все товары. */
export interface ItemsQuery {
  page: number
  categoryUrl: string
  /** Поиск по названию (подстрока). */
  search: string
}

export interface ItemsRequest extends ItemsQuery {
  pageLimit: number
}

export interface NewCategory {
  category: AddCategoryDTO
  image: FormData | null
}

export interface CategoryImageUpload {
  id: number
  image: FormData
}

/** Загрузка файлов товара: картинок или документов. */
export interface ItemUpload {
  itemId: number
  formData: FormData
}

/** Картинка или документ товара; `src` служит ключом. */
export interface ItemAsset {
  itemId: number
  src: string
}
