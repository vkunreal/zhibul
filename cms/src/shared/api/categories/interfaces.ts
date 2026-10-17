/** Значения ENUM `categories.sort_mode` — порядок товаров в категории. */
export type CategorySortModeDTO =
  'manual' | 'alphabet' | 'random' | 'price_asc' | 'price_desc' | 'newest'

/**
 * Строка таблицы `categories`.
 * - `parent_id` — `null` у корневых категорий;
 * - `is_contains` — 1, если внутри подкатегории, а не товары;
 * - `active` — 1, если категория видна на сайте;
 * - `image` — абсолютный URL картинки.
 */
export interface CategoryDTO {
  id: number
  parent_id: number | null
  position: number | null
  name: string
  url: string
  description: string | null
  image: string | null
  is_contains: number
  active: number
  sort_mode: CategorySortModeDTO
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
}

/** Элемент ответа `GET /api/categories/with-items-count/`. */
export interface CategoryWithItemsCountDTO extends CategoryDTO {
  items_count: number
}

/** Тело `POST /api/category`. */
export interface AddCategoryDTO {
  parent_id: number | null
  position: number
  name: string
  url: string
  description: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  sort_mode: CategorySortModeDTO
}

/** Ответ `POST /api/category`: созданная строка целиком. */
export interface AddCategoryResponseDTO {
  status: boolean
  data: CategoryDTO
}

/**
 * Тело `PUT /api/category`. Сервер отвечает пустым телом,
 * так же как на `DELETE /api/category/:id`.
 */
export interface ChangeCategoryDTO {
  id: number
  position: number
  name: string
  url: string
  description: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  sort_mode: CategorySortModeDTO
}

/** Тело `PUT /api/category/active`. */
export interface SetCategoryActiveDTO {
  id: number
  active: boolean
}

/** Ответ `PUT /api/category/active`: новое значение флага. */
export interface SetCategoryActiveResponseDTO {
  active: boolean
}

/** Ответ `POST /api/category/image/:category_id` (multipart, поле `file`). */
export interface UploadCategoryImageResponseDTO {
  status: boolean
  url: string
}
