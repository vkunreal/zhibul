import { describe, expect, it, vi } from 'vitest'

import { filesToFormData, readFileAsDataUrl } from './file'

describe('filesToFormData', () => {
  it('кладёт каждый файл под своим именем', () => {
    const a = new File(['a'], 'a.png', { type: 'image/png' })
    const b = new File(['b'], 'b.jpg', { type: 'image/jpeg' })

    const formData = filesToFormData([a, b])

    expect(formData.get('a.png')).toBe(a)
    expect(formData.get('b.jpg')).toBe(b)
  })
})

describe('readFileAsDataUrl', () => {
  it('читает файл как data URL', async () => {
    const file = new File(['hello'], 'note.txt', { type: 'text/plain' })
    const result = await readFileAsDataUrl(file)

    expect(result).toMatch(/^data:text\/plain;base64,/)
  })

  it('пробрасывает ошибку FileReader', async () => {
    const file = new File(['x'], 'broken.bin')
    const error = new Error('read failed')

    vi.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(
      function (this: FileReader) {
        queueMicrotask(() => {
          Object.defineProperty(this, 'error', { value: error })
          this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>)
        })
      },
    )

    await expect(readFileAsDataUrl(file)).rejects.toBe(error)
  })
})
