const API = process.env.API_URL

export const apiGet = async <T>(url: string, revalidate: number = 3600) => {
  try {
    const response = await fetch(`${API}${url}`, {
      cache: 'force-cache',
      next: { revalidate },
    }).then((res) => res.json())

    return response as T
  } catch (e) {
    console.error('NETWORK ERROR: ', url, e)
  }
}
