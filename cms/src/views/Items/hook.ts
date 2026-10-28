import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'

// В адресе нет `page` или там не число — показываем первую страницу.
const pageOf = (params: URLSearchParams) =>
  Math.max(1, Number(params.get('page')) || 1)

export const useItemsQuery = (itemPages: number) => {
  // Старые ссылки `/items/:url` ещё открываются: категорию забираем из пути.
  const { url: categoryFromPath = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  // Категория из query важнее пути: после редиректа путь уже пустой.
  const categoryUrl = searchParams.get('category') || categoryFromPath
  const search = searchParams.get('search') ?? ''
  const page = pageOf(searchParams)
  // Поле ввода живёт отдельно от адреса, чтобы не писать query на каждый символ.
  const [searchInput, setSearchInput] = useState(search)
  const searchString = searchParams.toString()

  // `/items/tools` становится `/items?category=tools`, история не плодится.
  useEffect(() => {
    if (!categoryFromPath) return

    const params = new URLSearchParams(searchString)
    params.set('category', categoryFromPath)
    navigate({ pathname: '/items', search: params.toString() }, { replace: true })
  }, [categoryFromPath, navigate, searchString])

  // Поиск в адресе обновляется через секунду после последнего ввода.
  // Новый запрос сбрасывает страницу: выдача уже другая.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextSearch = searchInput.trim()
      if (nextSearch === search) return

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          if (nextSearch) params.set('search', nextSearch)
          else params.delete('search')
          params.delete('page')
          return params
        },
        { replace: true },
      )
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [search, searchInput, setSearchParams])

  // После удаления последнего товара на последней странице её больше нет.
  useEffect(() => {
    if (itemPages <= 0 || page <= itemPages) return

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        if (itemPages <= 1) params.delete('page')
        else params.set('page', String(itemPages))
        return params
      },
      { replace: true },
    )
  }, [itemPages, page, setSearchParams])

  // Смена категории тоже начинает список с первой страницы.
  const onCategoryChange = (nextCategoryUrl: string) => {
    const params = new URLSearchParams(searchParams)
    if (nextCategoryUrl) params.set('category', nextCategoryUrl)
    else params.delete('category')
    params.delete('page')
    navigate({ pathname: '/items', search: params.toString() })
  }

  // Первая страница в адресе не пишется: отсутствие `page` и есть страница 1.
  const resetPage = () => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        params.delete('page')
        return params
      },
      { replace: true },
    )
  }

  // Страница 1 убирает параметр, остальные записывает числом.
  const onPageChange = (value: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (value > 1) params.set('page', String(value))
      else params.delete('page')
      return params
    })
  }

  return {
    categoryUrl,
    search,
    searchInput,
    setSearchInput,
    page,
    onCategoryChange,
    resetPage,
    onPageChange,
  }
}
