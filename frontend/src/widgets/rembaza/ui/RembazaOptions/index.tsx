import { FC } from 'react'

import { OptionList, Typography } from '@/shared/ui'

import { TABS } from './config'
import s from './styles.module.scss'

export const RembazaOptions: FC = () => {
  return (
    <section>
      <Typography
        className={s.title}
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
