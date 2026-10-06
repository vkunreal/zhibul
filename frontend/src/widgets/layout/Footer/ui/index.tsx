import { FC } from 'react'

import { FeedbackButton } from '@/features/sendFeedback'

import { useVariables } from '@/shared/api'
import { Icon, Wrapper } from '@/shared/ui'

import s from './styles.module.scss'

const socialNetworks = ['tg', 'vk', 'inst', 'youtube', 'dzen']

export const Footer: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={s.wrapper}>
      <footer className={s.footer}>
        <div className={s.contacts}>
          <a className={s.contact} href={`tel:${variable('phone_sales')}`}>
            <Icon name="phone" width={35} height={35} />

            <div className={s.contactInfo}>
              <h3 className={s.contactTitle}>Звонок</h3>
              <p className={s.contactText}>{variable('phone_sales')}</p>
            </div>
          </a>
          <a className={s.contact} href={`mailto:${variable('email')}`}>
            <Icon name="email" width={40} height={40} />

            <div className={s.contactInfo}>
              <h3 className={s.contactTitle}>Электронная почта</h3>
              <p className={s.contactText}>{variable('email')}</p>
            </div>
          </a>
        </div>

        <div className={s.sections}>
          <ul className={s.socialNetworks}>
            {socialNetworks.map(
              (network) =>
                variable(network) && (
                  <li key={network} className={s.socialNetwork}>
                    <a href={variable(network)} target="_blank">
                      <Icon name={network} width={30} height={30} />
                    </a>
                  </li>
                ),
            )}
          </ul>

          <div className={s.feedbackButton}>
            <FeedbackButton />
          </div>
        </div>

        <p className={s.copyright}>© 2025 ZHBL</p>
      </footer>
    </Wrapper>
  )
}
