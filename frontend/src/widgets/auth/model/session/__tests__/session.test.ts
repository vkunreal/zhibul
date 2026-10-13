import { allSettled, fork } from 'effector'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { EMPTY_CODE_SESSION } from '../constants'
import { $codeSession, $phoneNumber, backToPhone, codeIssued } from '../index'

import { authFlowReset } from '../../lifecycle'

const PHONE = '+375 (29) 111-11-11'
const issued = { ttl: 60, length: 6 }
const NOW = 1_000_000

const scopeWithCode = async () => {
  const scope = fork()
  await allSettled(codeIssued, { scope, params: { phone: PHONE, issued } })
  return scope
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('сессия кода', () => {
  it('до выдачи SMS пустая', () => {
    const scope = fork()

    expect(scope.getState($codeSession)).toEqual(EMPTY_CODE_SESSION)
    expect(scope.getState($phoneNumber)).toBe('')
  })

  it('после выдачи SMS хранит телефон с маской, ответ сервера и момент истечения', async () => {
    const scope = await scopeWithCode()

    expect(scope.getState($codeSession)).toEqual({
      phone: PHONE,
      issued,
      expiresAt: NOW + 60_000,
    })
    expect(scope.getState($phoneNumber)).toBe(PHONE)
  })

  it('не сдвигает момент истечения, пока время идёт', async () => {
    const scope = await scopeWithCode()

    vi.setSystemTime(NOW + 30_000)

    expect(scope.getState($codeSession).expiresAt).toBe(NOW + 60_000)
  })

  it('стирается кнопкой «Изменить номер»', async () => {
    const scope = await scopeWithCode()

    await allSettled(backToPhone, { scope })

    expect(scope.getState($codeSession)).toEqual(EMPTY_CODE_SESSION)
    expect(scope.getState($phoneNumber)).toBe('')
  })

  it('стирается сбросом модалки', async () => {
    const scope = await scopeWithCode()

    await allSettled(authFlowReset, { scope })

    expect(scope.getState($codeSession)).toEqual(EMPTY_CODE_SESSION)
  })

  it('при повторной выдаче SMS заменяется новой', async () => {
    const scope = await scopeWithCode()
    const next = { ttl: 120, length: 4 }

    vi.setSystemTime(NOW + 5_000)
    await allSettled(codeIssued, {
      scope,
      params: { phone: '+375 (33) 222-22-22', issued: next },
    })

    expect(scope.getState($codeSession)).toEqual({
      phone: '+375 (33) 222-22-22',
      issued: next,
      expiresAt: NOW + 5_000 + 120_000,
    })
  })
})
