import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { AuthButton } from '@/features/auth'
import { FeedbackButton } from '@/features/sendFeedback'

import { useVariables } from '@/shared/api'
import { Icon, Wrapper } from '@/shared/ui'

import s from './styles.module.scss'

export const Header: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={s.wrapper}>
      <header className={s.header}>
        <Link href="/" className={s.logo}>
          <Image width={140} height={57} src="/logo.avif" alt="Logo" />
        </Link>

        <div className={s.block}>
          <Icon name="phone" width={25} height={25} />

          <div className={s.phoneList}>
            <a
              className={s.blockText}
              href={`tel:${variable('phone_sales')}`}
            >
              {variable('phone_sales')}
            </a>
            <a
              className={s.blockText}
              href={`tel:${variable('phone_services')}`}
            >
              {variable('phone_services')}
            </a>
          </div>
        </div>

        <div className={s.block}>
          <Icon name="email" width={30} height={30} />

          <a className={s.blockText} href={`mailto:${variable('email')}`}>
            {variable('email')}
          </a>
        </div>

        <div className={s.buttons}>
          <FeedbackButton />
          <AuthButton />
        </div>
      </header>
    </Wrapper>
  )
}
