import { FC } from 'react'

import { Icon } from '@/shared/ui'

import { ProductFile } from '../../model'

import styles from './styles.module.scss'

interface ProductFilesProps {
  files: ProductFile[]
}

export const ProductFiles: FC<ProductFilesProps> = ({ files }) => {
  if (!files.length) {
    return null
  }

  return (
    <div>
      <h2>Прикрепленные файлы:</h2>

      <ul className={styles.list}>
        {files.map(({ src, title, icon }) => (
          <li key={src} className={styles.item}>
            <a href={src} className={styles.link}>
              <Icon name={icon} width={32} height={32} />

              <p>{title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
