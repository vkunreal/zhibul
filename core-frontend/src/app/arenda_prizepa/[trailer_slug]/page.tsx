import Image from 'next/image'
import { notFound } from 'next/navigation'

import { trailersApi } from '@/entities/trailer'
import {
  Breadcrumbs,
  Divider,
  OptionList,
  Typography,
  Wrapper,
} from '@/shared/ui'

import styles from './styles.module.scss'

type Params = Promise<{ trailer_slug: string }>

export async function generateStaticParams() {
  const trailers = await trailersApi.getAllTrailers()

  if (!trailers?.length) {
    return []
  }

  return trailers.map(({ url }) => ({
    trailer_slug: url,
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { trailer_slug } = await params

  const [trailers, trailer] = await Promise.all([
    trailersApi.getAllTrailers(),
    trailersApi.getTrailer(trailer_slug),
  ])

  const trailerRent = trailers?.find(({ url }) => url === trailer_slug)

  if (!trailerRent || !trailer) {
    return notFound()
  }

  const {
    seo_title: title = 'Аренда автоприцепов',
    seo_description: description = '',
    seo_keywords: keywords = '',
  } = trailerRent || {}

  return { title, description, keywords }
}

export default async function TrailersRent({ params }: { params: Params }) {
  const { trailer_slug } = await params

  const trailer = await trailersApi.getTrailer(trailer_slug)

  if (!trailer) {
    return notFound()
  }

  const { title, text, images, options } = trailer

  return (
    <>
      <Breadcrumbs
        elements={[
          { url: '/', title: 'Главная' },
          { url: '/arenda_prizepa', title: 'Аренда автоприцепов' },
        ]}
        activeTitle={title}
      />
      <Wrapper className={styles.container}>
        <Typography tag="h1" size="xxlRelative" textCenter uppercase>
          {title}
        </Typography>

        <Divider center />

        <Typography size="sm" fontWeight={400}>
          {text}
        </Typography>

        <section className={styles.gallery}>
          {images.map(({ src }, index) => (
            <div className={styles.imageWrapper} key={index}>
              <Image
                className={styles.image}
                src={src}
                alt="Изображение прицепа"
                width={800}
                height={600}
                sizes="(max-width: 959px) 100vw, 33vw"
              />
            </div>
          ))}
        </section>

        <Typography
          className={styles.subtitle}
          size="xlRelative"
          fontWeight={700}
          textCenter
          uppercase
        >
          Характеристики
        </Typography>

        <OptionList options={options} maxWidth={250} />
      </Wrapper>
    </>
  )
}
