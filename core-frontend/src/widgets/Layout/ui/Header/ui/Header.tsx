import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useVariables } from '@/shared/hooks'
import { Icon, Wrapper, RecallButton } from '@/shared/ui'

import styles from './styles.module.scss'

export const Header: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image width={140} height={57} src="/logo.avif" alt="Logo" />
        </Link>

        <div className={styles.block}>
          <Icon name="phone" width={25} height={25} />

          <div className={styles.phoneList}>
            <a
              className={styles.blockText}
              href={`tel:${variable('phone_sales')}`}
            >
              {variable('phone_sales')}
            </a>
            <a
              className={styles.blockText}
              href={`tel:${variable('phone_services')}`}
            >
              {variable('phone_services')}
            </a>
          </div>
        </div>

        <div className={styles.block}>
          <Icon name="email" width={30} height={30} />

          <a className={styles.blockText} href={`mailto:${variable('email')}`}>
            {variable('email')}
          </a>
        </div>

        <RecallButton />
      </header>
    </Wrapper>
  )
}
