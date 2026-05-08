export interface TrailerRent {
  id: number
  title: string
  description: string
  url: string
  image_src: string
  seo_title: string
  seo_description: string
  seo_keywords: string
}

export interface Trailer {
  id: number
  trailer_rent_id: number
  title: string
  text: string
  url: string
  options: {
    id: number
    trailer_id: number
    icon: string
    name: string
    text: string
  }[]
  images: {
    trailer_id: number
    src: string
  }[]
}
