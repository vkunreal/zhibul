const getEndpoint = (req) => {
  return `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
}

const createPrevURL = (endpointURL, page, limit) => {
  return `${endpointURL}?page=${page > 1 ? page - 1 : 1}&limit=${limit}`
}

const createNextUrl = (endpointURL, page, limit) => {
  return `${endpointURL}?page=${page + 1}&limit=${limit}`
}

module.exports = {
  getEndpoint,
  createPrevURL,
  createNextUrl,
}
