import { FC } from 'react'

import { OptionList, Typography } from '@/shared/ui'

import { TABS } from './config'
import styles from './styles.module.scss'

export const RembazaOptions: FC = () => {
  return (
    <section>
      <Typography
        className={styles.title}
        tag="h2"
        size="xlRelative"
        uppercase
        textCenter
      >
        Преимущества нашей сервисной службы
      </Typography>

      <OptionList options={TABS} />
    </section>
  )
}
