export interface NewsMedia {
  newsId: number
  src: string
  position: number
}

export interface News {
  id: number
  url: string
  title: string
  text: string
  shortText: string
  /** Момент публикации, миллисекунды Unix-времени. */
  date: number
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  media: NewsMedia[]
}
