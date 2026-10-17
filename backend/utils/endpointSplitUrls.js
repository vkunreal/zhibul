const getEndpoint = (req) => {
  return `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
}

/** Собирает URL страницы. query — любые доп. параметры кроме page/limit. */
const buildPageURL = (endpointURL, page, limit, query = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  for (const [key, value] of Object.entries(query)) {
    if (value != null && value !== '') {
      params.set(key, String(value))
    }
  }

  return `${endpointURL}?${params.toString()}`
}

const createPrevURL = (endpointURL, page, limit, query = {}) => {
  if (page <= 1) return null

  return buildPageURL(endpointURL, page - 1, limit, query)
}

const createNextUrl = (endpointURL, page, limit, count, query = {}) => {
  if (page * limit >= count) return null

  return buildPageURL(endpointURL, page + 1, limit, query)
}

module.exports = {
  getEndpoint,
  buildPageURL,
  createPrevURL,
  createNextUrl,
}
