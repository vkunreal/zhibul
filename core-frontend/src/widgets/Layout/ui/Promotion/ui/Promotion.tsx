import { FC } from 'react'
import { Icon, Wrapper } from '@/shared/ui'
import { useVariables } from '@/shared/hooks'

import { PROMO_BLOCKS } from '../utils'
import styles from './styles.module.scss'

export const Promotion: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={styles.wrapper}>
      <div className={styles.promotion}>
        {PROMO_BLOCKS.map(({ icon, variable: variableName, postfix }, i) => (
          <div className={styles.promotionBlock} key={i}>
            <Icon name={icon} width={36} height={36} />
            <h2 className={styles.title}>{variable(variableName)}</h2>
            <p className={styles.postfix}>{postfix}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
