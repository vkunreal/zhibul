import { FC } from 'react'

import { CallBackButton } from '@/features/SendCallBack'
import { useVariables } from '@/shared/api'
import { Icon, Wrapper } from '@/shared/ui'

import styles from './styles.module.scss'

const socialNetworks = ['tg', 'vk', 'inst', 'youtube', 'dzen']

export const Footer: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={styles.wrapper}>
      <footer className={styles.footer}>
        <div className={styles.contacts}>
          <a className={styles.contact} href={`tel:${variable('phone_sales')}`}>
            <Icon name="phone" width={35} height={35} />

            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Звонок</h3>
              <p className={styles.contactText}>{variable('phone_sales')}</p>
            </div>
          </a>
          <a className={styles.contact} href={`mailto:${variable('email')}`}>
            <Icon name="email" width={40} height={40} />

            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Электронная почта</h3>
              <p className={styles.contactText}>{variable('email')}</p>
            </div>
          </a>
        </div>

        <div className={styles.sections}>
          <ul className={styles.socialNetworks}>
            {socialNetworks.map(
              (network) =>
                variable(network) && (
                  <li key={network} className={styles.socialNetwork}>
                    <a href={variable(network)} target="_blank">
                      <Icon name={network} width={30} height={30} />
                    </a>
                  </li>
                ),
            )}
          </ul>

          <div className={styles.callBackButton}>
            <CallBackButton />
          </div>
        </div>

        <p className={styles.copyright}>© 2025 ZHBL</p>
      </footer>
    </Wrapper>
  )
}
