export interface PageQuery {
  page?: number
  limit?: number
}

export interface Page<T> {
  items: T[]
  count: number
  next: string | null
  prev: string | null
}

// Аргументы выборки без skip и take. Их подставляет paginate.
export interface PageArgs {
  where?: object
  orderBy?: unknown
  include?: unknown
  select?: unknown
  omit?: unknown
  cursor?: unknown
  distinct?: unknown
}
