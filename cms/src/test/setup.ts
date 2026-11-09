import { afterEach } from 'vitest'

const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>()

  return {
    get length() {
      return store.size
    },
    clear: () => {
      store.clear()
    },
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => [...store.keys()][index] ?? null,
    removeItem: (key: string) => {
      store.delete(key)
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value))
    },
  }
}

const ensureStorage = (name: 'localStorage' | 'sessionStorage') => {
  const current = globalThis[name]
  if (
    current &&
    typeof current.clear === 'function' &&
    typeof current.getItem === 'function'
  ) {
    return
  }

  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value: createMemoryStorage(),
  })
}

ensureStorage('localStorage')
ensureStorage('sessionStorage')

afterEach(() => {
  globalThis.localStorage.clear()
  globalThis.sessionStorage.clear()
})
