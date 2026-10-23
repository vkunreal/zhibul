import { ChangeEvent, useRef, useState } from 'react'

import { FilePreview } from '@shared/model'
import { readFileAsDataUrl } from '@shared/utils'

export const useImageDrafts = (onUpload: (files: File[]) => void) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [drafts, setDrafts] = useState<FilePreview[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [editing, setEditing] = useState(false)

  const openFileDialog = () => fileRef.current?.click()

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.target.files ?? [])
    if (!picked.length) return

    setFiles(picked)

    picked.forEach(async (file) => {
      if (!file.type.match('image')) return

      const src = await readFileAsDataUrl(file)
      setDrafts((current) => [...current, { name: file.name, src }])
    })
  }

  const removeDraft = (name: string) => {
    setDrafts((current) => current.filter((item) => item.name !== name))
    setFiles((current) => current.filter((file) => file.name !== name))
  }

  const clearDrafts = () => {
    setFiles([])
    setDrafts([])
  }

  const startEditing = () => {
    clearDrafts()
    setEditing(true)
  }

  const cancelEditing = () => {
    clearDrafts()
    setEditing(false)
  }

  const save = () => {
    const current = files
    clearDrafts()
    setEditing(false)
    if (!current.length) return
    onUpload(current)
  }

  return {
    fileRef,
    drafts,
    editing,
    openFileDialog,
    handleFiles,
    removeDraft,
    startEditing,
    cancelEditing,
    save,
  }
}
