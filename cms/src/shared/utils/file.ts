export const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const filesToFormData = (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => formData.append(file.name, file))
  return formData
}
