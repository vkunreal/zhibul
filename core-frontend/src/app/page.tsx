import { Company, Promotion } from '@/widgets/Layout'
import { MainSlider, Feedback, YandexMap, MAPS_TYPES } from '@/widgets'
import { getSlides } from '@/entities/slider'

export default async function Main() {
  const slides = await getSlides()

  return (
    <>
      <MainSlider slides={slides} />
      <Company />
      <Promotion />
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <Feedback />
    </>
  )
}
