import { getSlides } from '@/entities/slider'
import { getPage } from '@/shared/api'
import { MainSlider, Feedback, YandexMap, MAPS_TYPES } from '@/widgets'
import { Company, Promotion } from '@/widgets/Layout'

const PAGE = 'index'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Главная',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function Main() {
  const slides = await getSlides()

  return (
    <>
      {!!slides?.length && <MainSlider slides={slides} />}
      <Company />
      <Promotion />
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <Feedback />
    </>
  )
}
