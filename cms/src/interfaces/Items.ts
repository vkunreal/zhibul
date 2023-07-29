export interface ICategory {
  id: number
  name: string
  parent_id: number | null
  is_contains: number
}

export interface ICategoryCandidate {
  name: string
  parent_id: number | null
}

export interface IItem {
  id?: number
  category_id: number
  category_name: string
  name: string
  description: string
  brand: string
  manufacturer: string | number
  price: string
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
