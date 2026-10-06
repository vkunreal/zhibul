import { FeedbackBlock } from '@/widgets/feedback'
import { MAPS_TYPES, YandexMap } from '@/widgets/yandex'

import { getPage, useVariables } from '@/shared/api'
import { StaticPage, Icon, Breadcrumbs } from '@/shared/ui'

import s from './styles.module.scss'

const PAGE = 'contacts'

export async function generateMetadata() {
  const page = await getPage(PAGE)

  return {
    title: page?.seo_title ?? 'Контакты',
    description: page?.seo_description ?? '',
    keywords: page?.seo_keywords ?? '',
  }
}

export default async function ContactsPage() {
  const { variables, variable } = await useVariables()

  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Контакты"
      />
      <StaticPage page={PAGE}>
        <div className={s.contacts}>
          <a className={s.contact} href={`tel:${variable('phone_sales')}`}>
            <Icon name="phone" width={40} height={40} />
            <h2 className={s.contactTitle}>Телефон</h2>
            <p className={s.contactValue}>{variable('phone_sales')}</p>
          </a>

          <a className={s.contact} href={`mailto:${variable('email')}`}>
            <Icon name="email" width={40} height={40} />
            <h2 className={s.contactTitle}>Электронная почта</h2>
            <p className={s.contactValue}>{variable('email')}</p>
          </a>
        </div>

        <ul className={s.list}>
          <li className={s.listItem}>
            <span className={s.listTitle}>
              <Icon name="phone" width={32} height={32} />
              <span>Телефон продаж</span>
            </span>
            <a href={`tel:${variable('phone_sales')}`}>
              {variable('phone_sales')}
            </a>
          </li>
          <li className={s.listItem}>
            <span className={s.listTitle}>
              <Icon name="phone" width={32} height={32} />
              <span>Телефон услуг</span>
            </span>
            <a href={`tel:${variable('phone_services')}`}>
              {variable('phone_services')}
            </a>
          </li>
          <li className={s.listItem}>
            <span className={s.listTitle}>
              <Icon name="geopin" width={32} height={32} />
              <span>Адрес</span>
            </span>
            <a href={`tel:${variable('address')}`}>{variable('address')}</a>
          </li>
          <hr />
          <li className={s.worktime}>
            <p className={s.worktimeTitle}>Режим работы</p>
            {variables &&
              variables
                .filter(({ name }) => name === 'work_time')
                .map(({ id, value }) => (
                  <p className={s.worktimeValue} key={id}>
                    {value}
                  </p>
                ))}
          </li>
        </ul>
      </StaticPage>
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <FeedbackBlock />
    </>
  )
}
