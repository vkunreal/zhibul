export interface ICategory {
  id: number
  name: string
  parent_id: number | null
  is_contains: number
}

export interface ICategoryCandidate {
  name: string
  parent_id: number | null
}
