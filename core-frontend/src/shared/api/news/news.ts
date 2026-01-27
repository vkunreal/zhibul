export interface NewsItem {
  id: number
  url: string
  title: string
  text: string
  short_text: string
  date: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  media: {
    news_id: number
    src: string
    position: number
  }[]
}
