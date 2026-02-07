'use client'

import Image from 'next/image'
import { FC, useMemo, useRef, useState } from 'react'

import { ProductImage } from '@/entities/product'

import { ProductImagesProps } from '../interfaces'

import styles from './styles.module.scss'

const SPEED = 30

export const ProductImages: FC<ProductImagesProps> = ({ images, alt }) => {
  const [image, setImage] = useState<ProductImage | null>(null)

  const scrollElem = useRef<HTMLDivElement | null>(null)

  if (!images || !images.length) return null

  const productImage = useMemo(() => {
    const mainImage = images.find((im) => im.is_main)

    if (image) {
      return image
    } else if (mainImage) {
      return mainImage
    } else {
      return images[0]
    }
  }, [images, image])

  const onWheel = (e: WheelEvent) => {
    e.preventDefault()

    const dx = e.deltaX || 0
    const dy = e.deltaY || 0

    if ((dx === 0 && dy === 0) || !scrollElem.current) return

    const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy

    scrollElem.current.scrollLeft += delta * (e.deltaMode === 1 ? SPEED : 1)
  }

  return (
    <section className={styles.container}>
      <div className={styles.mainImageWrapper}>
        <Image
          className={styles.mainImage}
          src={productImage.src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className={styles.scrollElem}>
        {images.map(({ src }, ind) => (
          <div
            key={ind}
            onClick={() => {
              const foundImage = images.find((im) => im.src === src) ?? null

              if (foundImage) {
                setImage(foundImage)
              }
            }}
          >
            <Image width={150} height={150} src={src} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  )
}
