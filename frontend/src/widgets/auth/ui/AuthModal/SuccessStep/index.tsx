import { FC, useEffect, useState } from 'react'

import { Icon } from '@/shared/ui'

import { PHRASE_INTERVAL_MS, PHRASES, TITLE } from './constants'
import s from './styles.module.scss'

export const SuccessStep: FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % PHRASES.length)
    }, PHRASE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className={s.screen} role="status" aria-live="polite">
      <Icon
        name="spinner"
        className={s.spinner}
        width={64}
        height={64}
        aria-hidden
      />
      <div className={s.copy}>
        <p className={s.title}>{TITLE}</p>
        <p className={s.phrase} key={phraseIndex}>
          {PHRASES[phraseIndex]}
        </p>
      </div>
    </div>
  )
}
