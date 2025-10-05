'use client'

import { Wrapper } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './styles.module.scss'

export const NotFound = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Wrapper className={styles.wrapper}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>404</h1>
          <div className={styles.divider} />
          <p className={styles.text}>Страница не найдена</p>
        </div>

        <div className={styles.buttons}>
          <div>
            <button
              type="button"
              className={styles.button}
              onClick={handleBack}
            >
              Назад
            </button>
          </div>
          <div>
            <Link className={styles.button} href="/">
              Главная
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
