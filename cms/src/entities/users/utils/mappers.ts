import type { CandidateDTO, UserDTO } from '@shared/api'

import { Candidate, User } from '../model'

export const toUser = (dto: UserDTO): User => ({
  id: dto.id,
  phone: dto.phone,
  name: dto.name,
  company: dto.company ?? '',
  email: dto.email ?? '',
  comment: dto.comment ?? '',
  time: dto.time ? Number(dto.time) : null,
})

// Новые заявки сверху. Без времени — в конец; при равном времени выше больший id.
export const byNewest = (a: User, b: User) =>
  (b.time ?? -Infinity) - (a.time ?? -Infinity) || b.id - a.id

export const toCandidate = (dto: CandidateDTO): Candidate => ({
  id: dto.id,
  phone: dto.phone ?? '',
  name: dto.name ?? '',
  company: dto.company ?? '',
  email: dto.email ?? '',
  comment: dto.comment ?? '',
})
