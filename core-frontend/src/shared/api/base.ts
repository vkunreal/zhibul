const API = process.env.API_URL

export const apiGet = async <T>(url: string, revalidate?: number) => {
  const response = await fetch(`${API}${url}`, {
    ...(revalidate ? { next: { revalidate } } : {}),
  })
  const data = (await response.json()) as T

  return data
}
