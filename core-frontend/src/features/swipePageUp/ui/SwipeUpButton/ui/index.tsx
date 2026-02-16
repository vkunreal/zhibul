'use client'

import { Fade, useScrollTrigger } from '@mui/material'
import { FC } from 'react'

import { Icon } from '@/shared/ui'

import styles from './styles.module.scss'

export const SwipeUpButton: FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Fade in={trigger} unmountOnExit timeout={500}>
      <button type="button" className={styles.button} onClick={scrollToTop}>
        <Icon name="arrow" width={42} height={42} />
      </button>
    </Fade>
  )
}
