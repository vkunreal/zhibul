'use client'

import cn from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

import { Icon } from '@/shared/ui'

import styles from './styles.module.scss'

export const ViewToggle: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentView = (searchParams.get('view') as 'grid' | 'list') || 'grid'

  const toggleView = (view: 'grid' | 'list') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('view', view)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className={styles.block}>
      <button
        type="button"
        className={cn(styles.button, {
          [styles.active]: currentView === 'list',
        })}
        onClick={() => toggleView('list')}
      >
        <Icon name="one_block" width={24} height={24} />
      </button>

      <button
        type="button"
        className={cn(styles.button, {
          [styles.active]: currentView === 'grid',
        })}
        onClick={() => toggleView('grid')}
      >
        <Icon name="many_blocks" width={26} height={26} />
      </button>
    </div>
  )
}
