import { FC } from 'react'

import { FlexImage, Icon, Typography } from '@/shared/ui'

import s from './styles.module.scss'

export const RembazaCard: FC<{ text?: string }> = ({ text }) => {
  if (!text) {
    return null
  }

  return (
    <section className={s.card}>
      <FlexImage
        src="https://api.zhbl.by/images/remont-image.png"
        alt="Ремонт"
        loading="lazy"
        maxWidth={400}
      />

      <div>
        <Typography
          className={s.title}
          tag="h2"
          size="smRelative"
          uppercase
        >
          <Icon name="info" width={28} height={28} />О нашем сервисе
        </Typography>

        <hr className={s.hr} />

        <Typography size="sm">
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
      </div>
    </section>
  )
}
