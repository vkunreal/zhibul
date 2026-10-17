import { request } from '../http'
import { statusResponseSchema } from '../schemas'

import { DeleteCandidateDTO } from './interfaces'
import { candidatesSchema } from './schemas'

export const getCandidates = () =>
  request({ method: 'GET', path: '/api/candidates', schema: candidatesSchema })

export const deleteCandidate = (body: DeleteCandidateDTO) =>
  request({
    method: 'DELETE',
    path: '/api/candidate',
    schema: statusResponseSchema,
    body,
  })
