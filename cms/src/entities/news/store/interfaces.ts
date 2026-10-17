export interface NewsFormValues {
  url: string
  title: string
  text: string
  shortText: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export interface NewsMediaUpload {
  newsId: number
  formData: FormData
}

export interface NewsMediaRef {
  newsId: number
  src: string
}
