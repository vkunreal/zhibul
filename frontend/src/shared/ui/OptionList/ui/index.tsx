import { FC } from 'react'

import s from './styles.module.scss'

import { Icon } from '../../Icon'
import { Typography } from '../../Typography'


interface OptionListProps {
  options: { id: number; icon: string; name: string; text: string }[]
  maxWidth?: number
}

export const OptionList: FC<OptionListProps> = ({
  options,
  maxWidth = 450,
}) => {
  return (
    <ul className={s.list}>
      {options.map(({ id, icon, name, text }) => (
        <li key={id} className={s.listItem} style={{ maxWidth }}>
          <Icon name={icon} width={48} height={48} />

          <div>
            <Typography
              className={s.optionName}
              fontWeight={700}
              size="md"
            >
              {name}
            </Typography>

            <Typography size="xs">
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  )
}
