import { FC } from 'react'

import { Icon, Typography } from '@/shared/ui'

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

      <ul className={styles.list}>
        {TABS.map(({ id, icon, name, text }) => (
          <li key={id} className={styles.listItem}>
            <Icon name={icon} width={48} height={48} />

            <div>
              <Typography
                className={styles.optionName}
                fontWeight={700}
                size="md"
              >
                {name}
              </Typography>

              <Typography size="xs">
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
