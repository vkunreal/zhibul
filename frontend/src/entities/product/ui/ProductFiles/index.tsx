import { FC } from 'react'

import { Icon, Typography } from '@/shared/ui'

import s from './styles.module.scss'

import { ProductFile } from '../../model'


interface ProductFilesProps {
  files: ProductFile[]
}

export const ProductFiles: FC<ProductFilesProps> = ({ files }) => {
  if (!files.length) {
    return null
  }

  return (
    <section>
      <Typography tag="h2" size="xlRelative">
        Прикрепленные файлы:
      </Typography>

      <ul className={s.list}>
        {files.map(({ src, title, icon }) => (
          <li key={src} className={s.item}>
            <a href={src} className={s.link}>
              <Icon name={icon} width={32} height={32} />

              <p>{title}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
