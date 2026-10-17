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

export const toCandidate = (dto: CandidateDTO): Candidate => ({
  id: dto.id,
  phone: dto.phone ?? '',
  name: dto.name ?? '',
  company: dto.company ?? '',
  email: dto.email ?? '',
  comment: dto.comment ?? '',
})
