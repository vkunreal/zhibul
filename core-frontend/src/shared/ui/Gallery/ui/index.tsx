'use client'

import Image from 'next/image'
import { FC, useMemo, useRef, useState } from 'react'

import type { GalleryImage, GalleryProps } from '../interfaces'

import styles from './styles.module.scss'

const SPEED = 30

export const Gallery: FC<GalleryProps> = ({ images, alt }) => {
  const [image, setImage] = useState<GalleryImage | null>(null)

  const scrollElem = useRef<HTMLDivElement | null>(null)

  if (!images || !images.length) return null

  const sortedImages = useMemo(() => {
    return images.sort((a, b) => {
      if (a.position && b.position && a.position < b.position) {
        return -1
      } else if (a.position && !b.position) {
        return -1
      } else if (b.position && !a.position) {
        return 1
      }
      return 1
    })
  }, [images])

  const productImage = useMemo(() => {
    const mainImage = sortedImages.find((im) => im?.is_main)

    if (image) {
      return image
    } else if (mainImage) {
      return mainImage
    } else {
      return sortedImages[0]
    }
  }, [sortedImages, image])

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
        {sortedImages.length > 1 &&
          sortedImages.map(({ src }, ind) => (
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
