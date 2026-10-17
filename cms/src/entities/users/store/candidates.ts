import { createEffect, createEvent, createStore, sample } from 'effector'

import { deleteCandidate, getCandidates } from '@shared/api'

import { Candidate } from '../model'
import { toCandidate } from '../utils/mappers'

export const candidatesRequested = createEvent()

export const getCandidatesFx = createEffect(getCandidates)
export const deleteCandidateFx = createEffect((id: number) =>
  deleteCandidate({ id }),
)

export const $candidates = createStore<Candidate[]>([]).on(
  getCandidatesFx.doneData,
  (_, candidates) => candidates.map(toCandidate),
)

export const $candidatesLoading = getCandidatesFx.pending

sample({
  clock: [candidatesRequested, deleteCandidateFx.finally],
  target: getCandidatesFx,
})
