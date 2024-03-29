export interface ICategory {
  id: number
  name: string
  description: string
  image: string
  url: string
  parent_id: number | null
  active: boolean
  position: number
  is_contains: number
  seo_title: string
  seo_description: string
  seo_keywords: string
}

export interface ICategoryCandidate {
  name: string
  description: string
  url: string
  parent_id?: number | null
  position: number
  is_contains?: number
  seo_title: string
  seo_description: string
  seo_keywords: string
}

export interface IItem {
  id?: number
  url: string
  position?: number
  category_id: number
  category_url?: string
  category_name: string
  name: string
  description: string
  brand: string
  manufacturer: string | number
  price: string
  valute_id: string
  purchase_price: string | null
  profitabilaty: string | null
  price_postfix: string | null
  seo_title: string
  seo_description: string
  seo_keywords: string
}

export interface ICountry {
  id: number
  name: string
}

export interface IOption {
  id?: number
  item_id: number
  position: number
  name: string
  value: string
  is_dropdown: boolean
  show_menu: boolean
}

export interface IOptionPosition {
  id: number
  position: number
}
