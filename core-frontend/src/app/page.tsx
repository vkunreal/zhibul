import { Company, Promotion } from "@/widgets/Layout";
import { YandexMap } from "@/widgets/YandexMap";
import { Feedback } from "@/widgets/Feedback";
import { MainSlider } from "@/widgets/MainSlider";
import { getSlides } from "@/entities/slider";

export default async function Main() {
  const slides = await getSlides();

  return (
    <>
      <MainSlider slides={slides} />
      <Company />
      <Promotion />
      <YandexMap />
      <Feedback />
    </>
  );
}
