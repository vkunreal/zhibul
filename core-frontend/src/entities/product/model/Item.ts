interface ItemImage {
  item_id: number
  src: string
  is_main: number
}

interface ItemMenuOption {
  id: number
  item_id: number
  position: number
  name: string
  value: string
  show_item: number
  show_menu: number
  is_dropdown: number
}

export interface Item {
  id: number
  code: string
  position: number
  category_url: string
  category_name: string
  category_id: number
  url: string
  name: string
  description: string
  manufacturer: string
  brand: string
  price: number | null
  valute_id: number
  purchase_price: number
  profitabilaty: number
  price_postfix: string
  display_price: string
  seo_title: string
  seo_description: string
  seo_keywords: string | null
  images: ItemImage[]
  menuOptions: ItemMenuOption[]
  files: []
}
