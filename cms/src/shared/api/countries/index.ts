import { request } from '../http'

import { countriesSchema } from './schemas'

export const getCountries = () =>
  request({ method: 'GET', path: '/api/countries', schema: countriesSchema })
