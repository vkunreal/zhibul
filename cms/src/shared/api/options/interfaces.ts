/**
 * Строка таблицы `options` из `GET /api/options/:item_id` — характеристика
 * товара. Флаги хранятся как int 0/1, у старых строк бывают `null`:
 * - `show_item` — показывать на странице товара;
 * - `show_menu` — показывать в карточке каталога;
 * - `is_dropdown` — значение вида `1.1-1.2-1.3` выводится выпадающим списком.
 */
export interface OptionDTO {
  id: number
  item_id: number
  position: number
  name: string
  value: string
  show_item: number | null
  show_menu: number | null
  is_dropdown: number | null
}

/** Тело `POST /api/option`. */
export interface AddOptionDTO {
  item_id: number
  name: string
  value: string
  position: number
}

/** Тело `PUT /api/option`. */
export interface ChangeOptionDTO {
  option_id: number
  name: string
  value: string
  is_dropdown: boolean
  show_menu: boolean
}

/** Элемент тела `PUT /api/option/positions`. */
export interface OptionPositionDTO {
  id: number
  position: number
}

/** Тело `DELETE /api/option`. */
export interface DeleteOptionDTO {
  option_id: number
}
