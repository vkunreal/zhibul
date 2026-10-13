/** Промис, который тест завершает сам: держит запрос «в полёте», пока нужно. */
export const deferred = <T>() => {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

/** Даёт отработать всем уже завершённым промисам и их цепочкам. */
export const flushPromises = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0))
