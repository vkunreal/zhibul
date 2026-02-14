import Image from 'next/image'
import { FC } from 'react'

import { Icon, Typography } from '@/shared/ui'

import styles from './styles.module.scss'

export const RembazaCard: FC<{ text?: string }> = ({ text }) => {
  if (!text) {
    return null
  }

  return (
    <section className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src="https://api.zhbl.by/images/remont-image.png"
          alt="Ремонт"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div>
        <Typography
          className={styles.title}
          tag="h2"
          size="smRelative"
          upperCase
        >
          <Icon name="info" width={28} height={28} />О нашем сервисе
        </Typography>

        <hr className={styles.hr} />

        <Typography size="sm">
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
      </div>
    </section>
  )
}
