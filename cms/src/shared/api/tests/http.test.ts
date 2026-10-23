import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { validateResponse } from '../http'

describe('validateResponse', () => {
  it('возвращает распарсенные данные при успехе', () => {
    const schema = z.object({ id: z.number(), name: z.string() })
    const data = { id: 1, name: 'Товар' }

    expect(validateResponse(schema, data, 'GET /api/item')).toEqual(data)
  })

  it('при ошибке логирует и отдаёт данные как есть', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const schema = z.object({ id: z.number() })
    const data = { id: 'bad' }

    expect(validateResponse(schema, data, 'GET /api/item')).toEqual(data)
    expect(errorSpy).toHaveBeenCalledOnce()
    expect(String(errorSpy.mock.calls[0]?.[0])).toContain('GET /api/item')
  })
})
