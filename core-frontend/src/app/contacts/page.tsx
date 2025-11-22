import { useVariables } from '@/shared/hooks/useVariables'
import { StaticPage } from '@/shared/ui'
import { Icon } from '@/shared/ui'

import styles from './styles.module.scss'
import { getPage } from '@/shared/api'
import { Breadcrumbs } from '@/shared/ui'
import { Feedback, MAPS_TYPES, YandexMap } from '@/widgets'

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
        <div className={styles.contacts}>
          <a className={styles.contact} href={`tel:${variable('phone_sales')}`}>
            <Icon name="phone" width={40} height={40} />
            <h2 className={styles.contactTitle}>Телефон</h2>
            <p className={styles.contactValue}>{variable('phone_sales')}</p>
          </a>

          <a className={styles.contact} href={`mailto:${variable('email')}`}>
            <Icon name="email" width={40} height={40} />
            <h2 className={styles.contactTitle}>Электронная почта</h2>
            <p className={styles.contactValue}>{variable('email')}</p>
          </a>
        </div>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.listTitle}>
              <Icon name="phone" width={32} height={32} />
              <span>Телефон продаж</span>
            </span>
            <a href={`tel:${variable('phone_sales')}`}>
              {variable('phone_sales')}
            </a>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listTitle}>
              <Icon name="phone" width={32} height={32} />
              <span>Телефон услуг</span>
            </span>
            <a href={`tel:${variable('phone_services')}`}>
              {variable('phone_services')}
            </a>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listTitle}>
              <Icon name="geopin" width={32} height={32} />
              <span>Адрес</span>
            </span>
            <a href={`tel:${variable('address')}`}>{variable('address')}</a>
          </li>
          <hr />
          <li className={styles.worktime}>
            <p className={styles.worktimeTitle}>Режим работы</p>
            {variables &&
              variables
                .filter(({ name }) => name === 'work_time')
                .map(({ id, value }) => (
                  <p className={styles.worktimeValue} key={id}>
                    {value}
                  </p>
                ))}
          </li>
        </ul>
      </StaticPage>
      <YandexMap type={MAPS_TYPES.ADDRESS} />
      <Feedback />
    </>
  )
}
