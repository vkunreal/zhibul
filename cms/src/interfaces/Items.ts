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
  category: string
  name: string
  description: string
  brand: string
  manufacturer: string
  price: string
}
