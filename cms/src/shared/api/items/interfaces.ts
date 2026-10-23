/**
 * Товар из `GET /api/items-splitted`: строка `items`, к которой сервер
 * присоединил категорию и страну.
 * - `code` — артикул, до 6 символов;
 * - `manufacturer` — название страны (в таблице хранится её id);
 * - `price` — в БД это varchar, поэтому приходит строкой;
 * - `valute_id` — валюта цены, по умолчанию 1;
 * - `profitabilaty` — рентабельность, название колонки с опечаткой;
 * - `is_active`, `is_order_only` — BOOLEAN, приходят как 0/1.
 */
export interface ItemDTO {
  id: number
  code: string | null
  position: number | null
  category_id: number
  category_url: string
  category_name: string
  url: string
  name: string
  description: string | null
  brand: string | null
  manufacturer: string | null
  price: string | null
  valute_id: number
  purchase_price: number | null
  profitabilaty: number | null
  price_postfix: string | null
  /** Сформированная цена витрины (`buildDisplayPrice` на бэкенде). */
  display_price?: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  is_active: number
  is_order_only: number
}

/** Query-параметры `GET /api/items-splitted`. Без `category_url` — все товары. */
export interface GetItemsQueryDTO {
  page: number
  limit: number
  category_url?: string
  /** Подстрока названия товара. */
  search?: string
}

/**
 * Ответ `GET /api/items-splitted`. `count` — число товаров с учётом фильтра,
 * `prev` и `next` — URL соседних страниц или `null`.
 */
export interface ItemsPageDTO {
  data: ItemDTO[]
  count: number
  prev: string | null
  next: string | null
}

/** Тело `POST /api/item`. `manufacturer` — id страны. */
export interface AddItemDTO {
  category_id: number
  position: number
  url: string
  name: string
  description: string
  brand: string
  manufacturer: number
  price: string
  valute_id: number
  purchase_price: number | null
  profitabilaty: number | null
  price_postfix: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  is_active: boolean
  is_order_only: boolean
}

/** Ответ `POST /api/item/:id/copy`. `url` — новый адрес копии. */
export interface CopiedItemDTO {
  id: number
  url: string
  category_url: string
}

/** Тело `PUT /api/item/`. */
export interface ChangeItemDTO extends AddItemDTO {
  item_id: number
}

/** Строка таблицы `images` из `GET /api/item/images/:item_id`. */
export interface ItemImageDTO {
  item_id: number
  src: string
  is_main: number | null
}

/** Тело `PUT /api/item/image-main/` и `DELETE /api/item/delete/image`. */
export interface ItemImageSrcDTO {
  src: string
}
