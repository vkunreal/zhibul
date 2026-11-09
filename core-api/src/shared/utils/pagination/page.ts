import { Prisma } from 'prisma/client'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants'
import { Page, PageArgs, PageQuery } from './interfaces'

type PageDelegate = {
  findMany(args?: object): Promise<unknown>
  count(args?: { where?: object }): Promise<number>
}

type PageItem<M, A> =
  Prisma.Result<M, A, 'findMany'> extends readonly (infer R)[] ? R : never

export const resolvePage = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
}: PageQuery) => ({
  page,
  limit,
  skip: (page - 1) * limit,
  take: limit,
})

const pageHref = (url: string, page: number, limit: number) => {
  const splitAt = url.indexOf('?')
  const path = splitAt === -1 ? url : url.slice(0, splitAt)
  const params = new URLSearchParams(
    splitAt === -1 ? '' : url.slice(splitAt + 1),
  )

  params.set('page', String(page))
  params.set('limit', String(limit))

  return `${path}?${params.toString()}`
}

// `next` и `prev` сохраняют текущий путь и остальные параметры запроса.
// На последней и первой странице они равны null.
export const toPage = <T>(
  items: T[],
  count: number,
  url: string,
  query: PageQuery,
): Page<T> => {
  const { page, limit } = resolvePage(query)

  return {
    items,
    count,
    next: page * limit < count ? pageHref(url, page + 1, limit) : null,
    prev: page > 1 ? pageHref(url, page - 1, limit) : null,
  }
}

// Одна страница модели Prisma с findMany и count. where уходит в оба запроса.
// Тип строки берётся из include и select аргумента.
export const paginate = async <
  M extends PageDelegate,
  const A extends PageArgs,
>(
  model: M,
  args: A,
  url: string,
  query: PageQuery,
): Promise<Page<PageItem<M, NoInfer<A>>>> => {
  const { skip, take } = resolvePage(query)

  const [items, count] = await Promise.all([
    model.findMany({ ...args, skip, take }),
    model.count({ where: args.where }),
  ])

  return toPage(items as PageItem<M, A>[], count, url, query)
}
