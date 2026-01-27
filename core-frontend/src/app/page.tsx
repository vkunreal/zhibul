import { getSlides } from '@/entities/slider'
import { MainSlider, Feedback, YandexMap, MAPS_TYPES } from '@/widgets'
import { Company, Promotion } from '@/widgets/Layout'

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
