export interface Category {
  id: number
  position: number
  name: string
  description: string
  image: string
  url: string
  parent_id: number | null
  is_contains: number
  seo_title: string
  seo_description: string
  seo_keywords: string
  active: number
}
