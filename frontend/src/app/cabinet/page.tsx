import { Breadcrumbs, Wrapper } from '@/shared/ui'

export function generateMetadata() {
  return { title: 'Кабинет', description: '', keywords: '' }
}

export default async function Cabinet() {
  return (
    <>
      <Breadcrumbs
        elements={[{ url: '/', title: 'Главная' }]}
        activeTitle="Кабинет"
      />
      <Wrapper>
        <h1>Кабинет</h1>
      </Wrapper>
    </>
  )
}
