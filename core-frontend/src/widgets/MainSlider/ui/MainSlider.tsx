'use client'

import { FC } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { Slide } from '@/entities/slider'
import { useResize } from '@/shared/hooks'
import { Loader } from '@/shared/ui'
import 'swiper/css'
import 'swiper/css/pagination'

import { MainSliderProps } from '../interfaces'
import styles from './styles.module.scss'
import './pagination.scss'

export const MainSlider: FC<MainSliderProps> = ({ slides }) => {
  const { innerWidth } = useResize()

  const isDesktop = innerWidth > 768

  const slide = ({ id, url, title, images: { desktop, mobile } }: Slide) => (
    <SwiperSlide key={id}>
      <div
        className={styles.slide}
        style={{
          backgroundImage: `url(${isDesktop ? desktop : mobile})`,
        }}
      >
        <Link href={url} className={styles.slideLink}>
          <p className={styles.slideTitle}>{title}</p>
        </Link>
      </div>
    </SwiperSlide>
  )

  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        style={{ height: isDesktop ? 800 : 600 }}
      >
        {slides.length && innerWidth ? (
          slides.map(slide)
        ) : (
          <SwiperSlide>
            <Loader />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
