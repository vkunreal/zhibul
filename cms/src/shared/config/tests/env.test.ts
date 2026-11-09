import { describe, expect, it } from 'vitest'

import { env } from '../env'

describe('env', () => {
  it('читает URL API и сайта из тестового окружения', () => {
    expect(env.apiUrl).toBe('http://localhost:5001')
    expect(env.siteUrl).toBe('http://localhost:3000')
  })
})
