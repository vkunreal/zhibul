'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Wrapper } from '@/shared/ui'

import s from './styles.module.scss'

export const NotFound = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Wrapper className={s.wrapper}>
      <div className={s.content}>
        <div>
          <h1 className={s.title}>404</h1>
          <div className={s.divider} />
          <p className={s.text}>Страница не найдена</p>
        </div>

        <div className={s.buttons}>
          <div>
            <button
              type="button"
              className={s.button}
              onClick={handleBack}
            >
              Назад
            </button>
          </div>
          <div>
            <Link className={s.button} href="/">
              Главная
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
