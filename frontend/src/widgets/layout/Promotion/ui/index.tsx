import { FC } from 'react'

import { useVariables } from '@/shared/api'
import { Icon, Wrapper } from '@/shared/ui'

import { PROMO_BLOCKS } from '../utils'
import s from './styles.module.scss'

export const Promotion: FC = async () => {
  const { variable } = await useVariables()

  return (
    <Wrapper className={s.wrapper}>
      <div className={s.promotion}>
        {PROMO_BLOCKS.map(({ icon, variable: variableName, postfix }, i) => (
          <div className={s.promotionBlock} key={i}>
            <Icon name={icon} width={36} height={36} />
            <h2 className={s.title}>{variable(variableName)}</h2>
            <p className={s.postfix}>{postfix}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
